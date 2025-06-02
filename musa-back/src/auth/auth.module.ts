import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// Definición del esquema directamente aquí
import { Prop, Schema as MongooseSchema, SchemaFactory as MongooseSchemaFactory } from '@nestjs/mongoose';

@MongooseSchema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop()
  description?: string;

  @Prop()
  profileImage?: string;

  @Prop({ required: true, default: false })
  isAdmin: boolean;
}

export const UserSchema = MongooseSchemaFactory.createForClass(User);


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
