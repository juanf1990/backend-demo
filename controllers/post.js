const uuid = require("uuid");
const { Post } = require("../models");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    const mappedPosts = posts.map((post) => {
      return {
        id: post._id,
        imgUrl: post.imgUrl,
        description: post.description,
        userId: post.userId,
        readBy: post.readBy,
      };
    });
    res.status(200).json({ posts: mappedPosts });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      id: uuid.v4(),
      imgUrl: req.body.imageUrl,
      description: req.body.description,
      userId: req.body.userId,
      readBy: req.body.readBy,
    });
    res.status(201).json({ post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }
    post.imgUrl = req.body.imgUrl;
    post.description = req.body.description;
    await post.save();
    res.status(200).json({ post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }
    await post.destroy();
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
