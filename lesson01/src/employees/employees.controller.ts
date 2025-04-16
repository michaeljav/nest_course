import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, Role } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { skip } from 'node:test';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle() //to jump the rate limit for this endpoint
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name); //to use logger service in this controller

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }
  @SkipThrottle({ default: false }) //not to jump the rate limit for this endpoint
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: Role) {
    this.logger.log(`Request for ALL Employees\t${ip}`); //to use logger service in this controller
    return this.employeesService.findAll(role);
  }
  // if I dont have name short to override
  // @Throttle({ default: { ttl: 1000, limit: 1 } }) // 1 second, 3 requests per second
  @Throttle({ short: { ttl: 1000, limit: 1 } }) // 1 second, 3 requests per second
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
