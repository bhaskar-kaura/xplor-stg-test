import { Global, Module } from '@nestjs/common';
import { AxiosService } from './axios/axios.service';

// Decorate the class with @Global() to make it a global module.
@Global()
@Module({
  imports: [],
  providers: [AxiosService],
  exports: [AxiosService],
})
// Define the CommonModule class.
export class CommonModule {}
