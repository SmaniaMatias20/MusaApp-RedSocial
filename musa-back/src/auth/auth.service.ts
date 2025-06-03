import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



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
    accessToken: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService
    ) { }



    async create(userData: User): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);

        const newUser = new this.userModel({
            ...userData,
            password: hashedPassword
        });

        return newUser.save();
    }

    async login(usernameOrEmail: string, password: string): Promise<{ accessToken: string; username: string; isAdmin: boolean; firstName: string; lastName: string } | null> {
        const user = await this.userModel.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
        }).exec();

        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        const payload = {
            sub: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,

        };
    }



    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findOneByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();
    }
}

