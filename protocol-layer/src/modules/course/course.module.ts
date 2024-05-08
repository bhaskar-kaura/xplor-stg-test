import { Module } from '@nestjs/common';
import { CourseService } from './services/course.serviceV1';
import { CourseController } from './course.controllerV1';
import { AxiosService } from 'src/common/axios/axios.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, AxiosService],
  exports: [CourseService],
})
export class CourseModule {}
