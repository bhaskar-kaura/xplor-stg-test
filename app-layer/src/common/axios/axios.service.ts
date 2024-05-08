import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}
  async get(url: string, params?: any, headers?: any) {
    try {
      return await this.httpService.axiosRef.get(url, { params, headers });
    } catch (error) {}
  }

  async post(url: string, data: any, headers?: any) {
    try {
      return await this.httpService.axiosRef.post(url, data, { headers });
    } catch (error) {}
  }

  async put(url: string, data: any, headers?: any) {
    try {
      return await this.httpService.axiosRef.put(url, data, { headers });
    } catch (error) {}
  }

  async delete(url: string, params?: any, headers?: any) {
    try {
      return await this.httpService.axiosRef.delete(url, { params, headers });
    } catch (error) {}
  }
}
