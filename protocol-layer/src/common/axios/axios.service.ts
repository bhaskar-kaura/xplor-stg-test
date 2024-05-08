import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosService {
  constructor(private httpService: HttpService) {}
  async get(url: string, params?: any, headers?: any) {
    return await this.httpService.axiosRef.get(url, { params, headers });
  }

  async post(url: string, data: any, headers?: any) {
    try {
      return await this.httpService.axiosRef.post(url, data, { headers });
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  async put(url: string, data: any, headers?: any) {
    try {
      return await this.httpService.axiosRef.put(url, data, { headers });
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  async delete(url: string, params?: any, headers?: any) {
    try {
      return await this.httpService.axiosRef.delete(url, { params, headers });
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }
}
