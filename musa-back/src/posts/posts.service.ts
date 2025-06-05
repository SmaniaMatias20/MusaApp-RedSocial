// src/posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Post') private postModel: Model<Post>,
    ) { }

    async createPost(data: {
        username: string;
        content: string;
        imageUrl?: string;

    }) {
        const newPost = new this.postModel({
            username: data.username,
            content: data.content,
            imageUrl: data.imageUrl,
            likes: [],
            comments: [],
            date: new Date(),
            show: true,
        });

        return newPost.save();
    }
}
