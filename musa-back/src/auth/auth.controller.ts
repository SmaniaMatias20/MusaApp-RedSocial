import {
    Body,
    Controller,
    Get,
    Post,
    BadRequestException,
} from '@nestjs/common';
import { AuthService, User } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        // Verificamos si el email ya existe
        const existing = await this.authService.findOneByEmail(createUserDto.email);
        if (existing) {
            throw new BadRequestException('El email ya está registrado');
        }

        // Creamos el usuario
        const user = await this.authService.create(createUserDto);
        return user;
    }

    @Get()
    async list(): Promise<User[]> {
        return this.authService.findAll();
    }
}
