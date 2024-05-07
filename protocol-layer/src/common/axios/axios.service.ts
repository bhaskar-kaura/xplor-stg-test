import { HttpService } from '@nestjs/axios';

export class AxiosService {
  constructor(private readonly httpService: HttpService) {}
  async get(url: string, params?: any, headers?: any) {
    return this.httpService.axiosRef.get(url, { params, headers });
  }

  async post(url: string, data: any, headers?: any) {
    return this.httpService.axiosRef.post(url, data, { headers });
  }

  async put(url: string, data: any, headers?: any) {
    return this.httpService.axiosRef.put(url, data, { headers });
  }

  async delete(url: string, params?: any, headers?: any) {
    return this.httpService.axiosRef.delete(url, { params, headers });
  }
}
