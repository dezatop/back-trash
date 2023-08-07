import { Module } from '@nestjs/common';
import { DraftPostController } from './draft-post.controller';
import { DraftPostService } from './draft-post.service';
import { AuthModule } from '@/entities/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostDraft } from '@/entities/draft-post/draft-post.entity';
import { CompanyModule } from '@/entities/company/company.module';
import { PostModule } from '@/entities/post/post.module';
import { Company } from '@/entities/company/company.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PostDraft, Company]),
    CompanyModule,
    PostModule,
  ],
  controllers: [DraftPostController],
  providers: [DraftPostService],
})
export class DraftPostModule {}
