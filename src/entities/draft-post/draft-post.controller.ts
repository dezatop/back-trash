import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { DraftPostService } from '@/entities/draft-post/draft-post.service';
import { DraftPostCreate } from '@/entities/draft-post/dto/draftPostCreate.dto';
import { JwtAuthGuard } from '@/entities/jwt/jwt-auth.guard';

@Controller('draft-post')
export class DraftPostController {
  constructor(private readonly draftPostService: DraftPostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPost(@Body() draftPostDto: DraftPostCreate, @Request() req) {
    return await this.draftPostService.createPostDraft(
      draftPostDto,
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('activated/:id')
  async activatedPost(@Param('id', ParseIntPipe) id) {
    return await this.draftPostService.addInActivePost(id);
  }
}
