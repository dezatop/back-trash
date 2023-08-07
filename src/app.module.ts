import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '@/entities/users/users.module';
import { TypeOrmModule } from '@/db/typeorm.module';
import { AuthModule } from '@/entities/auth/auth.module';
import { JwtGlobalModule } from '@/entities/jwt/jwt.module';
import { PostModule } from '@/entities/post/post.module';
import { DraftPostModule } from '@/entities/draft-post/draft-post.module';
import { CompanyModule } from '@/entities/company/company.module';
import { FileModule } from '@/entities/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'public'),
    }),
    AuthModule,
    UsersModule,
    TypeOrmModule,
    PostModule,
    DraftPostModule,
    JwtGlobalModule,
    CompanyModule,
    FileModule,
  ],
})
export class AppModule {}
