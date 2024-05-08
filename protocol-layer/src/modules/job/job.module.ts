import { Module } from '@nestjs/common';
import { JobService } from './job.serviceV1';
import { JobController } from './job.controllerV1';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
