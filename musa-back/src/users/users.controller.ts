import {
    Body,
    Controller,
    Get,
    Post,
    BadRequestException,
} from '@nestjs/common';
import { UsersService, User } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        // Verificamos si el email ya existe
        const existing = await this.usersService.findOneByEmail(createUserDto.email);
        if (existing) {
            throw new BadRequestException('El email ya está registrado');
        }

        // Creamos el usuario
        const user = await this.usersService.create(createUserDto);
        return user;
    }

    @Get()
    async list(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
