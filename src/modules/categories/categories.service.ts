import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }
  async createCategory(newCategory: CreateCategoryDto) {
    try {
      await this.prisma.categories.create({
        data: {
          ...newCategory,
        }
      })
      return {
        message: 'Category created successfully',
        data: newCategory
      }
    } catch (error) {
      return {
        message: 'Category create failed',
        error
      }
    }
  }

  async findAllCategories() {
    try {
      let categoriesList = await this.prisma.categories.findMany();
      return {
        data: categoriesList
      }
    } catch (error) {
      return {
        error
      }
    }
  }

  async findByStatus(status:string) {
    try {
        let activeCategories = await this.prisma.categories.findMany({
          where: {
            status: status == "active" ? true : status == "inactive" ? false : null
          }
        })
        return {
          data: activeCategories
        }
    } catch (error) {
      return {
        error
      }
    }
  }

  async updateCategory(categoryId: number, updateCategory: UpdateCategoryDto) {
    try {
      let result = await this.prisma.categories.update({
        where: {
          id: categoryId,
        },
        data: updateCategory
      })
      return {
        data:result,
        msg: "Update successed"
      }
    } catch (error) {
      return {
        msg: "Update failed",
        error
      }
    }
  }

  async deleteCategory(categoryId: number) {
    try {
      await this.prisma.categories.delete({
        where: {
          id: categoryId,
        }
      })
      return {
        msg: "delete successed"
      }
    } catch (error) {
      return {
        msg: "delete failed",
        error
      }
    }
  }

  async findById(id:number){
    try {
      let foundData = await this.prisma.categories.findUnique({
        where: {
          id
        }
      })
      if(foundData){
        return {
          msg:"Get data successed",
          data:foundData
        }
      }else{
        throw false
      }
    } catch (error) {
      return {
        msg:"Get data failed",
        error
      }
    }
  }
}
