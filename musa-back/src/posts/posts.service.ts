import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { CreateLikeDto } from './dto/create-like.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Post') private postModel: Model<Post>,
    ) { }

    async createPost(data: {
        idUser: string;
        firstName: string;
        lastName: string;
        profileImage: string;
        username: string;
        content: string;
        image?: string;
    }) {
        try {
            if (!data.username || !data.content) {
                throw new BadRequestException('El nombre de usuario y el contenido son obligatorios');
            }

            const newPost = new this.postModel({
                idUser: data.idUser,
                firstName: data.firstName,
                lastName: data.lastName,
                profileImage: data.profileImage,
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
            throw new InternalServerErrorException('No se pudo crear el post');
        }
    }

    async findAllById(id: string, isAdmin: string): Promise<Post[]> {
        const filter = isAdmin === 'true' ? { idUser: id } : { idUser: id, show: true };
        try {
            const posts = await this.postModel
                .find(filter)
                .sort({ date: -1 })
                .limit(20)
                .exec();
            return posts;
        } catch (error) {
            console.error('Error al obtener todos los posts:', error);
            throw new InternalServerErrorException('Error al obtener todos los posts');
        }
    }

    async findAll(isAdmin: string): Promise<Post[]> {
        try {
            const filter = isAdmin === 'true' ? {} : { show: true };

            const posts = await this.postModel
                .find(filter)
                .sort({ date: -1 })
                .limit(20)
                .exec();

            return posts;
        } catch (error) {
            console.error('Error al obtener todos los posts:', error);
            throw new InternalServerErrorException('Error al obtener todos los posts');
        }
    }


    async likePost(postId: string, likeData: CreateLikeDto) {
        try {
            const post = await this.postModel.findById(postId);

            if (!post) {
                throw new BadRequestException('No se encontró el post');
            }
            if (post.likes.some(like => like.idUser === likeData.idUser)) {
                post.likes = post.likes.filter(like => like.idUser !== likeData.idUser);
                await post.save();
                return post;
            }

            post.likes.push(likeData);
            await post.save();

            return post;
        } catch (error) {
            console.error('Error al hacer like:', error);
            throw new InternalServerErrorException('Error al hacer like');
        }
    }

    async addComment(postId: string, commentDto: CreateCommentDto) {
        const post = await this.postModel.findById(postId);

        if (!post) {
            throw new NotFoundException('Post no encontrado');
        }

        const comment = {
            ...commentDto,
            date: new Date(),
            edited: false,
            show: true,
        };

        post.comments.push(comment);

        await post.save();
        return post;
    }

    async showPost(postId: string, show: boolean) {
        const post = await this.postModel.findById(postId);
        if (!post) {
            throw new NotFoundException('Post no encontrado');
        }
        post.show = show;
        await post.save();
        return post;
    }

}
