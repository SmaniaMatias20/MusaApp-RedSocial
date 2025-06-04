// src/posts/posts.controller.ts
import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreatePostDto } from './dto/create-post.dto';


@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('image')) // 'image' debe coincidir con el nombre del campo file
    async createPost(
        @UploadedFile() file: Express.Multer.File,
        @Body() createPostDto: CreatePostDto,
    ) {
        const imageUploadResult = await this.cloudinaryService.uploadImageFromBuffer(file);

        const newPost = await this.postsService.createPost({
            ...createPostDto,
            imageUrl: imageUploadResult.secure_url,
        });

        return newPost;
    }
}
