import {
    Body,
    Controller,
    Get,
    Post,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService, User } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User> {
        const existingEmail = await this.authService.findOneByEmail(createUserDto.email);
        const existingUsername = await this.authService.findOneByUsername(createUserDto.username);

        if (existingEmail) {
            throw new BadRequestException('El email ya está registrado');
        }

        if (existingUsername) {
            throw new BadRequestException('El nombre de usuario ya está registrado');
        }

        const user = await this.authService.create(createUserDto);
        return user;
    }

    // Nuevo endpoint para login
    @Post('login')
    async login(
        @Body() body: { usernameOrEmail: string; password: string }
    ): Promise<Omit<User, 'password'>> {
        const user = await this.authService.login(body.usernameOrEmail, body.password);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        return user; // Retorna el usuario sin contraseña
    }

    @Get()
    async list(): Promise<User[]> {
        return this.authService.findAll();
    }
}
