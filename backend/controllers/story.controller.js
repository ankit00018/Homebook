import Story from '../models/story.model.js';
import User from '../models/user.model.js';

// Get all stories
export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate('user', 'username avatarUrl')
      .sort({ createdAt: -1 });
    
    res.status(200).json(stories);
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ message: 'Error fetching stories' });
  }
};

// Get feed stories from followed users
export const getFeedStories = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const followingIds = [...user.following, req.user.id];
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const stories = await Story.find({
      user: { $in: followingIds },
      createdAt: { $gte: oneDayAgo }
    }).populate('user', 'username avatarUrl');

    res.status(200).json(stories);
  } catch (error) {
    console.error('Feed stories error:', error);
    res.status(500).json({ message: 'Error fetching feed stories' });
  }
};

// Create new story
export const createStory = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.length === 0) {
      return res.status(400).json({ message: 'Story content required' });
    }

    for (const item of content) {
      if (!['image', 'video'].includes(item.type)) {
        return res.status(400).json({ message: 'Invalid content type' });
      }
      if (!item.url) {
        return res.status(400).json({ message: 'URL required for content' });
      }
    }

    const newStory = new Story({
      user: req.user.id,
      content,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ message: 'Error creating story' });
  }
};

// Delete story
export const deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    if (story.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete story' });
    }

    await Story.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({ message: 'Error deleting story' });
  }
};

// Mark story as viewed
export const viewStory = async (req, res) => {
  try {
    await Story.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { viewers: req.user.id } }
    );
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('View story error:', error);
    res.status(500).json({ message: 'Error viewing story' });
  }
};