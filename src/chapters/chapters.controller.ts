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
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { isNotEmpty } from 'class-validator';
import { CategoriesService } from 'src/categories/categories.service';
import { ChaptersService } from './chapters.service';
import { ChapterDto } from './dto/chapter.dto';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { FindChapterDto } from './dto/find-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@ApiTags('Category Chapters')
@Controller('chapters')
export class ChaptersController {
  constructor(
    private readonly chaptersService: ChaptersService,
    private readonly categoryService: CategoriesService,
  ) {}

  @ApiOkResponse({
    type: ChapterDto,
    description: 'Add a new chapter to a given category',
  })
  @ApiBody({
    type: CreateChapterDto,
    required: true,
    description: 'New chapter details',
  })
  @Post()
  async careate(
    @Body() createChapterDto: CreateChapterDto,
  ): Promise<ChapterDto> {
    return await this.chaptersService.create(createChapterDto);
  }

  @ApiOkResponse({
    type: ChapterDto,
    isArray: true,
    description: 'Find chapters',
  })
  @Get()
  async findAll(@Query() query: FindChapterDto): Promise<ChapterDto[]> {
    return await this.chaptersService.findAll(query);
  }

  @ApiOkResponse({ type: ChapterDto, description: 'Get a chapter by id' })
  @ApiParam({ type: String, required: true, name: 'chapterId' })
  @Get(':chapterId')
  findOne(@Param('chapterId') chapterId: string) {
    return this.chaptersService.findOne(chapterId);
  }

  @ApiOkResponse({
    type: ChapterDto,
    description: 'Update a chapter by id and return the update chapter',
  })
  @ApiParam({ type: String, required: true, name: 'chapterId' })
  @Patch(':chapterId')
  update(
    @Param('chapterId') chapterId: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    return this.chaptersService.update(chapterId, updateChapterDto);
  }

  @ApiNoContentResponse({
    type: null,
    description: 'Remove a chapter by id',
  })
  @ApiParam({ type: String, required: true, name: 'chapterId' })
  @Delete(':chapterId')
  remove(@Param('chapterId') chapterId: string) {
    return this.chaptersService.remove(chapterId);
  }
}
