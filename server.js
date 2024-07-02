import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
