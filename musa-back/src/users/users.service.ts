import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private cloudinaryService: CloudinaryService) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
        createUserDto.email = createUserDto.email.toLocaleLowerCase();
        createUserDto.username = createUserDto.username.toLocaleLowerCase();

        const existingEmail = await this.userModel.findOne({
            email: createUserDto.email,
        });

        if (existingEmail) {
            throw new BadRequestException('El email ya está en uso por otro usuario');
        }

        const existingUsername = await this.userModel.findOne({
            username: createUserDto.username,
        });

        if (existingUsername) {
            throw new BadRequestException('El nombre de usuario ya está en uso por otro usuario');
        }

        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });

        return newUser.save();
    }


    async findAllByUsername(username: string): Promise<User[]> {
        return this.userModel
            .find({ username: { $ne: username.trim() } })
            .select('username firstName lastName profileImage')
            .limit(3)
            .exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException('Usuario no encontrado');
        return user;
    }

    async remove(id: string): Promise<void> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Usuario no encontrado para eliminar');
    }

    async updateVisibility(id: string, show: boolean): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException('Usuario no encontrado para actualizar');
        user.show = show;
        return user.save();
    }

    async update(id: string, user: any, file?: Express.Multer.File): Promise<User> {
        const existingEmail = await this.userModel.findOne({
            email: user.email,
            _id: { $ne: id }
        });
        if (existingEmail) {
            throw new BadRequestException('El correo electrónico ya está en uso por otro usuario');
        }
        const existingUsername = await this.userModel.findOne({
            username: user.username,
            _id: { $ne: id }
        });
        if (existingUsername) {
            throw new BadRequestException('El nombre de usuario ya está en uso por otro usuario');
        }

        if (file) {
            const imageUploadResult = await this.cloudinaryService.uploadImageFromBuffer(file);
            user.profileImage = imageUploadResult.secure_url;
        }

        if (user.password) {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
        }

        const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();

        if (!updatedUser) {
            throw new NotFoundException('Usuario no encontrado para actualizar');
        }

        return updatedUser;
    }

}
