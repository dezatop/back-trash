// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Get,
//   Param,
//   ParseIntPipe,
//   Post,
//   Query, UsePipes, ValidationPipe
// } from '@nestjs/common';
// import { AppService } from './app.service';
// import {TestPost} from "./dto/TestPost";
//
// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}
//
//   @Get('test/:id')
//   test(@Query() query, @Param('id', ParseIntPipe) id) {
//     if(isNaN(Number(id))) {
//       throw new BadRequestException('Error')
//     }
//     console.log(query)
//     return `test1${id}`
//   }
//
//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
//
//   @UsePipes(new ValidationPipe())
//   @Post()
//   testPost(@Body() dto: TestPost) {
//     return dto
//   }
// }
