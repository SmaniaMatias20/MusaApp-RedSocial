import {
    Controller,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
    Body,
    BadRequestException,
    InternalServerErrorException,
    Query,
    Param,
    Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateLikeDto } from './dto/create-like.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

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
        try {
            let image: string | undefined;
            console.log('createPostDto', createPostDto);
            // Validación simple de campos obligatorios
            if (!createPostDto.idUser) {
                throw new BadRequestException('El id del usuario es obligatorio');
            }

            // Subida a Cloudinary (si hay archivo)
            if (file) {
                try {
                    const imageUploadResult = await this.cloudinaryService.uploadImageFromBuffer(file);
                    image = imageUploadResult.secure_url;
                } catch (err) {
                    console.error('Error subiendo imagen a Cloudinary:', err);
                    throw new InternalServerErrorException('Error al subir la imagen');
                }
            }
            // Crear post en la base de datos
            const newPost = await this.postsService.createPost({
                ...createPostDto,
                image,
            });

            return newPost;

        } catch (error) {
            console.error('Error en el controlador createPost:', error);
            if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
                throw error;
            }
            throw new InternalServerErrorException('Error interno al crear el post');
        }
    }

    @Get('/all')
    findAll(@Query('isAdmin') isAdmin: string) {
        return this.postsService.findAll(isAdmin);
    }

    @Get(':id')
    findById(@Param('id') id: string, @Query('isAdmin') isAdmin: string) {
        return this.postsService.findAllById(id, isAdmin);
    }


    @Post('like/:postId')
    async likePost(
        @Param('postId') postId: string,
        @Body() createLikeDto: CreateLikeDto
    ) {
        return this.postsService.likePost(postId, createLikeDto);
    }

    @Post('comments/:postId')
    async addComment(
        @Param('postId') postId: string,
        @Body() createCommentDto: CreateCommentDto,
    ) {
        return this.postsService.addComment(postId, createCommentDto);
    }

    @Put('comments/:postId/:commentId')
    async editComment(
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
        @Body() createCommentDto: CreateCommentDto,
    ) {
        return this.postsService.editComment(postId, commentId, createCommentDto);
    }

    @Put('show/:postId')
    async showPost(
        @Param('postId') postId: string,
        @Body('show') show: boolean
    ) {
        return this.postsService.showPost(postId, show);
    }

}
