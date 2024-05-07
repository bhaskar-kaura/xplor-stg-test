import { Module } from '@nestjs/common';
import { ScholarshipService } from './scholarship.serviceV1';
import { ScholarshipController } from './scholarship.controllerV1';

@Module({
  controllers: [ScholarshipController],
  providers: [ScholarshipService],
})
export class ScholarshipModule {}
