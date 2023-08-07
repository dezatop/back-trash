import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [JwtModule],
})
export class JwtGlobalModule {}
