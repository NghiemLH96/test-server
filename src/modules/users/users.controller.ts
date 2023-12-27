import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { UserLogin } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() newUserDetail: CreateUserDto, @Res() res: Response) {
    try {
      let { error } = await this.usersService.createNewUser(newUserDetail)
      if (!error) {
        return res.status(200).json({
          message: 'User created successfully'
        })
      }
      return res.status(413).json({
        message: error.meta.target
      })
    } catch (error) {
      return res.status(500).json({
        message: "Server Error , please try again later"
      })
    }
  }

  @Post("/login")
  async login(@Body() loginDetail: UserLogin, @Res() res: Response) {
    try {
      let result = await this.usersService.login(loginDetail)
      if (result.data) {
        return res.status(200).json({
          message: result.message,
          data: result.data
        })
      } else {
        return res.status(413).json({
          message: result.message
        })
      }
    } catch (error) {
      return res.status(500).json({
        message: "Server Error , please try again later"
      })
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
  