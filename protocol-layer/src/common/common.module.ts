import { Global, Module } from '@nestjs/common';
import { AxiosService } from './axios/axios.service';
import { HttpModule, HttpService } from '@nestjs/axios';

// Decorate the class with @Global() to make it a global module.
@Global()
@Module({
  imports: [{ module: HttpModule, global: true }],
  providers: [AxiosService],
  exports: [AxiosService],
})
// Define the CommonModule class.
export class CommonModule {}
