import { Controller, Get, Param, Delete, Query, Put, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAllByUsername(@Query('username') username: string) {
        return this.usersService.findAllByUsername(username);
    }

    @Get('all')
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

    @Put('updateVisibility/:id')
    updateVisibility(@Param('id') id: string, @Body('show') show: boolean) {
        return this.usersService.updateVisibility(id, show);
    }

    @Put('update/:id')
    @UseInterceptors(FileInterceptor('profileImage'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
    ) {

        return this.usersService.update(id, body, file);
    }

}
