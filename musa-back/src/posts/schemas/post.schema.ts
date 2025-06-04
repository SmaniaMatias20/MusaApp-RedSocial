// src/posts/schemas/post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    content: string;

    @Prop()
    imageUrl: string;

    @Prop({ type: [String], default: [] })
    likes: string[];

    @Prop({
        type: [{ username: String, content: String }],
        default: [],
    })
    comments: { username: string; content: string }[];

    @Prop({ default: Date.now })
    date: Date;

    @Prop({ default: true })
    show: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
