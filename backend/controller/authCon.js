import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();


//const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken, please choose a different one.' });
    }


      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

    // Create new user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const login = async (req, res) => {
  const { username, password } = req.body

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!existingUser) {
      return res.status(400).json({ error: 'you dont have an account, create an account' });
    }

    if(!bcrypt.compareSync(password, existingUser.password)){
      return res.status(400).json("password is wrong");
    }

    const token = jwt.sign({
      userId: existingUser.id
    }, JWT_SECRET)

    res.cookie('access_token', token, {
      httpOnly: true,
    }).status(200).json({ user: existingUser, token });

}

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.");
};





