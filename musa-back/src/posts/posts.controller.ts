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
    @UseInterceptors(FileInterceptor('image'))
    async createPost(
        @UploadedFile() file: Express.Multer.File,
        @Body() createPostDto: CreatePostDto,
    ) {
        let image: string | undefined;

        if (file) {
            const imageUploadResult = await this.cloudinaryService.uploadImageFromBuffer(file);
            image = imageUploadResult.secure_url;
        }

        const newPost = await this.postsService.createPost({
            ...createPostDto,
            image,
        });

        return newPost;
    }

}
