

import { PrismaClient } from "@prisma/client";
import { authenticate } from '../Middleware/auth.js';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {userId: req.userId, completed: false},
    });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const getTask = (req, res) => {
  res.json("from controller")
}

export const addTask = async (req, res) => {

  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  
  const { taskName, taskContent, startTime, endTime} = req.body;
  let userId = null;
  console.log(token)
  jwt.verify(token, JWT_SECRET, (err, userInfo) =>  {
    if (err) return res.status(403).json("Token is not valid!");
    userId = userInfo.userId;
  });
  if (userId == null) return res.status(409)
    console.log("get task created " + userId)
    const user = await prisma.user.findUnique({
      where: {
        id:userId,
      },
    })

    try {
      const task = await prisma.task.create ({
        data: {
          taskName,
          taskContent,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          user: {
            connect: {
              userId: 1
            }
          }
        }
      });

      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }
  

export const deleteTask = (req, res) => {
  res.json("from controller")
}

export const updateTask = (req, res) => {
  res.json("from controller")
}



//import { PrismaClient } from "@prisma/client";
/*
const prisma = new PrismaClient();

export const getTasks = async (req, res) => {
    const tasks = await prisma.tasks.findMany({
        where: { userId: req.userId, deleted: false},
    });
    res.json(tasks);
};

export const addTask = async (req, res)=>{
    const {taskName, taskContent} = req.body;

    try {
        console.log(taskName, taskContent)
        const task = await prisma.task.create({
            data: {
                taskName,
                taskContent,
                userId: req.userId,
            },
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const EditTask = async (req, res) => {
    const {id} = req.params;
    const { taskName, taskCotent, completed } = req.body;

    try {
        const task = await prisma.task.update({
          where: { id: parseInt(id) },
          data: { title, description, completed },
        });
        res.json(task);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await prisma.task.update({
        where: { id: parseInt(id) },
        data: { deleted: true },
      });
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export const getDeletedTasks = async (req, res) => {
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId, deleted: true },
    });
    res.json(tasks);
  };
  */