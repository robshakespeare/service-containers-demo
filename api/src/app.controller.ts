import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRootInfo() {
    return {
      service: 'Service Containers Demo API',
      date: new Date(),
      message: this.appService.getHello(),
    };
  }
}
