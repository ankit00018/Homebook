import express from 'express';
import {
  getAllStories,
  getFeedStories,
  createStory,
  deleteStory,
  viewStory
} from '../controllers/storyController.js';

const router = express.Router();

