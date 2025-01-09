import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { Paginate, PaginateQuery, PaginatedSwaggerDocs } from 'nestjs-paginate';
import { UserResponseDTO } from '../dtos';
import { JwtAuthGuard } from '@api/auth/guards/jwt.guard';

@Controller('users')
@ApiTags('web - users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @PaginatedSwaggerDocs(UserResponseDTO, {
    sortableColumns: ['name'],
    searchableColumns: ['name'],
    maxLimit: +process.env.PAGINATION_MAX_LIMIT,
  })
  @ApiOperation({ summary: 'Get all users' })
  async getAllPaginated(@Paginate() query: PaginateQuery) {
    return await this.userService.getAllPaginated(query);
  }
}
