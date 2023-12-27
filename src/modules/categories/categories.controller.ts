import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, ParseEnumPipe, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  async createCategory(@Body() body: CreateCategoryDto, @Res() res: Response) {
    try {
      let result = await this.categoriesService.createCategory(body);
      if (result.error) {
        throw result.error
      } else {
        return res.status(200).json({
          msg: "Create Successed",
          data: result.data
        })
      }
    } catch (error) {
      return res.status(500).json({
        msg: "Create Failed",
      })
    }
  }

  @Get()
  async findCategories(@Res() res: Response, @Query('status') status: string, @Query('id') id: number) {

    
    try {
      if (status == "active" || "inactive") {
        let result = await this.categoriesService.findByStatus(status);
        if (!result.error) {
          return res.status(200).json({
            msg: "Get active categories successed",
            data: result.data
          })
        } else {
          throw result.error.meta.cause
        }
      }else

      return
      if (typeof id == "number") {
        console.log("enter");
        
        let result = await this.categoriesService.findById(id);
        if (!result.error) {
          return res.status(200).json({
            msg: "Get data successed",
            data: result.data
          })
        } else {
          throw result.error.meta.cause
        }
      } else {
        let result = await this.categoriesService.findAllCategories();
        if (result.error) {
          return res.status(200).json({
            msg: "Get all categories success",
            data: result.data
          })
        } else {
          throw result.error.meta.cause
        }
      }
    } catch (error) {
      return res.status(500).json({
        msg: error
      })
    }
  }

  @Patch()
  async updateCategory(@Query('id', ParseIntPipe) categoryId: number, @Body() updateDetail: UpdateCategoryDto, @Res() res: Response) {
    try {
      let result = await this.categoriesService.updateCategory(categoryId, updateDetail);
      if (result.error) {
        throw result.error.meta.cause
      } else {
        return res.status(200).json({
          msg: "Update successed",
          data: result.data
        })
      }
    } catch (error) {
      return res.status(500).json({
        msg: error,
      })
    }
  }

  @Delete()
  async deleteCategory(@Query('id', ParseIntPipe) categoryId: number, @Res() res: Response) {
    try {
      let result = await this.categoriesService.deleteCategory(categoryId);

      if (!result.error) {
        return res.status(200).json({
          msg: 'delete successed',
        })
      } else {
        return res.status(413).json({
          msg: result.error.meta.cause,
        })
      }
    } catch (error) {
      return res.status(500).json({
        msg: 'server error',
      })
    }
  }
}
