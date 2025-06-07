import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
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
        try {
            if (!data.username || !data.content) {
                throw new BadRequestException('El nombre de usuario y el contenido son obligatorios');
            }

            const newPost = new this.postModel({
                username: data.username,
                content: data.content,
                image: data.image,
                likes: [],
                comments: [],
                date: new Date(),
                show: true,
            });
            return await newPost.save();
        } catch (error) {
            console.error('Error al crear el post:', error);

            // Puedes personalizar más los errores si lo deseas
            throw new InternalServerErrorException('No se pudo crear el post');
        }
    }

    async findAllByUsername(username: string): Promise<Post[]> {
        try {
            const posts = await this.postModel
                .find({ username: username })
                .sort({ date: -1 }) // Ordena por fecha descendente
                .exec();
            return posts;
        } catch (error) {
            console.error('Error al obtener todos los posts:', error);
            throw new InternalServerErrorException('Error al obtener todos los posts');
        }
    }

}
