import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { FindLessonsDto } from './dto/find-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonEntity } from './entities/lesson.entity';
import { LessonsService } from './lessons.service';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOkResponse({
    type: LessonEntity,
    description: 'Create a new lesson',
  })
  @Post()
  async create(
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<LessonEntity> {
    return await this.lessonsService.create(createLessonDto);
  }

  @ApiOkResponse({
    type: LessonEntity,
    isArray: true,
    description: 'Find lessons',
  })
  @Get()
  async findAll(@Query() query: FindLessonsDto): Promise<LessonEntity[]> {
    return await this.lessonsService.findAll(query);
  }

  @ApiOkResponse({ type: LessonEntity, description: 'Get a lesson by id' })
  @ApiParam({
    type: String,
    required: true,
    name: 'lessonId',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Get(':lessonId')
  async findOne(@Param('lessonId') lessonId: string): Promise<LessonEntity> {
    return this.lessonsService.findOne(lessonId);
  }

  @ApiOkResponse({
    type: LessonEntity,
    description: 'Update a lesson by id and  return the updated lesson',
  })
  @ApiParam({
    type: String,
    required: true,
    name: 'lessonId',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Patch(':lessonId')
  update(
    @Param('lessonId') lessonId: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(lessonId, updateLessonDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiParam({
    type: String,
    required: true,
    name: 'lessonId',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Delete(':lessonId')
  remove(@Param('lessonId') lessonId: string) {
    return this.lessonsService.remove(lessonId);
  }
}
