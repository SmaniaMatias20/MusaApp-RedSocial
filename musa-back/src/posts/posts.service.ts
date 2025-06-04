// src/posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
    ) { }

    async createPost(data: {
        username: string;
        content: string;
        imageUrl?: string;
        date?: Date | string;
    }) {
        const newPost = new this.postModel({
            username: data.username,
            content: data.content,
            imageUrl: data.imageUrl,
            likes: [],
            comments: [],
            date: data.date ?? new Date(),
            show: true,
        });

        return newPost.save();
    }
}
