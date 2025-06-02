import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Interfaz de usuario
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    birthDate: Date | string;
    description?: string;
    profileImage?: string;
    isAdmin: boolean;
}

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async create(userData: User): Promise<User> {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }
}
