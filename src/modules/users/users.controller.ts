import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { Authorization } from 'src/common/decorators';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Role } from 'src/common/enums';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
// @ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) { }

  @Post('change-password')
  @HttpCode(HttpStatus.CREATED)
  async changeUserPassword(
    @Body() changedPasswordDto: ChangePasswordDto
  ): Promise<boolean> {
    return this.userService.changeUserPassword(changedPasswordDto);
  }

  @Authorization(Role.Admin, Role.SuperAdmin)
  @Post('change-password/admin')
  @HttpCode(HttpStatus.CREATED)
  async changeAdminPassword(
    @Body() changedPasswordDto: ChangePasswordDto
  ): Promise<boolean> {
    return this.userService.changeAdminPassword(changedPasswordDto);
  }

  @Get('check-username')
  @HttpCode(HttpStatus.OK)
  async checkUsername(
    @Query('username') username: string
  ): Promise<{ available: boolean }> {
    return this.userService.checkUsername(username);
  }

  @Authorization(Role.Admin, Role.SuperAdmin)
  @HttpCode(HttpStatus.OK)
  @Get('check-username/admin')
  async checkAdminUsername(@Query('username') username: string): Promise<{ available: boolean }> {
    return this.userService.checkAdminUsername(username);
  }
}
