// src/posts/dto/create-post.dto.ts
export class CreatePostDto {
    username: string;
    content: string;
    image?: string;
    date?: Date | string;

}
