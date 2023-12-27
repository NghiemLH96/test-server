import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLogin } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService ){}
  async createNewUser(newUserDetail: CreateUserDto) {
    try {
      await this.prisma.users.create({
        data:{
          ...newUserDetail,
          createdAt:String(Date.now()),
          updatedAt:String(Date.now()),
        }
      })
      return {
        message:"User created successfully"
      }
    } catch (error) {
      return {
        message:"User created failed",
        error
      }
    }
  }

  async login(loginDetail:UserLogin){
    try {
      const accDetail = await this.prisma.users.findUnique({
        where:{
          userName:loginDetail.username
        }
      })
      if (accDetail) {
        if (accDetail.status) {
          if(accDetail.password == loginDetail.password){
            return {
              message:"Login successful",
              data:accDetail
            }
          }else{
            return {
              message:"Passwords incorrect"
            }
          }
        }else{
          return {
            message:"Account was Freezed"
          }
        }
      }else{
        return {
          message:"User not found"
        }
      }
    } catch (error) {
      
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
