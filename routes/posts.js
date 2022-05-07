import express from 'express';
import auth from '../middleware/auth.js'
import {commentPost, getsearchPost,getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search',getsearchPost)
router.post('/',auth, createPost);
router.patch('/:id', auth,updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost', auth,likePost);
router.get('/:id', getPost);
router.post('/:id/comment',commentPost)


export default router;