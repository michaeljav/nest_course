import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  /*
  GET /users
  GET /users/:id
  POST  /user 
  PATCH /users/:id  //You just want change one thing in the user no the entire user
  DELETE /users/:id
  */

  //query params
  @Get() //GET /users or /users/?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    console.log('QUERY PARAM');
    if (role) {
      return [{ role }];
    }
    return [];
  }

  // The order does matter in the endpoint  controller.
  @Get('interns') // GET /users/intern (must come before :id)
  findAllInterns() {
    console.log('entered in the interns');
    return [];
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    console.log('all users id');
    return { id };
  }

  @Post() //POST /users
  create(@Body() user: {}) {
    return user;
  }
  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id') // PATCH /users/:id
  delete(@Param('id') id: string) {
    return { id };
  }
}
