import { Module } from '@nestjs/common';
import { JobService } from './services/v1/job.serviceV1';
import { JobController } from './controller/v1/job.controllerV1';
import { AxiosService } from 'src/common/axios/axios.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [JobController],
  providers: [JobService, AxiosService],
})
export class JobModule {}
