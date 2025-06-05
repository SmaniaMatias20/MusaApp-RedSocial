import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';


@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Post') private postModel: Model<Post>,
    ) { }

    async createPost(data: {
        username: string;
        content: string;
        image?: string;

    }) {

        const newPost = new this.postModel({
            username: data.username,
            content: data.content,
            image: data.image,
            likes: [],
            comments: [],
            date: new Date(),
            show: true,
        });

        return newPost.save();
    }
}
