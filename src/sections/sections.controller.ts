import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SectionEntity } from './entities/section.entity';
import { FindSectionsDto } from './dto/find-section.dto';

@ApiTags('Chapter Sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @ApiOkResponse({
    type: SectionEntity,
    description: 'Add a new section to a given chapter',
  })
  @Post()
  async create(
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<SectionEntity> {
    return await this.sectionsService.create(createSectionDto);
  }

  @ApiOkResponse({
    type: SectionEntity,
    isArray: true,
    description: 'Find sections',
  })
  @Get()
  async findAll(@Query() query: FindSectionsDto): Promise<SectionEntity[]> {
    return await this.sectionsService.findAll(query);
  }

  @ApiOkResponse({
    type: SectionEntity,
    description: 'Get a section by id',
  })
  @ApiParam({
    type: String,
    required: true,
    name: 'sectionId',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Get(':sectionId')
  findOne(@Param('sectionId') sectionId: string) {
    return this.sectionsService.findOne(sectionId);
  }

  @ApiOkResponse({
    type: SectionEntity,
    description: 'Update a section and return the updated section',
  })
  @ApiParam({
    type: String,
    required: true,
    name: 'sectionId',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Patch(':sectionId')
  update(
    @Param('sectionId') sectionId: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    return this.sectionsService.update(sectionId, updateSectionDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiParam({
    type: String,
    required: true,
    name: 'sectionId',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Delete(':sectionId')
  remove(@Param('sectionId') sectionId: string) {
    return this.sectionsService.remove(sectionId);
  }
}
