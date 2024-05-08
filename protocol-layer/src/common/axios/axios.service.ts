import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GrafanaLoggerService } from 'src/services/grafana/service/grafana.service';
import { InternalMessages } from '../constants/logger-message';

@Injectable()
export class AxiosService {
  constructor(
    private readonly httpService: HttpService,
    private readonly loggerService: GrafanaLoggerService,
  ) {}
  async get(url: string, params?: any, headers?: any) {
    try {
      return await this.httpService.axiosRef.get(url, { params, headers });
    } catch (error) {}
  }

  async post(url: string, data: any, headers?: any) {
    try {
      return await this.httpService.axiosRef.post(url, data, { headers });
    } catch (error) {
      this.loggerService.sendDebug({
        message: `${InternalMessages.POST_REQUEST} ${error}`,
        methodName: this.post.name,
      });
      return error;
    }
  }

  async put(url: string, data: any, headers?: any) {
    try {
      return await this.httpService.axiosRef.put(url, data, { headers });
    } catch (error) {
      this.loggerService.sendDebug({
        message: `${InternalMessages.PUT_REQUEST} ${error}`,
        methodName: this.put.name,
      });
      return error;
    }
  }

  async delete(url: string, params?: any, headers?: any) {
    try {
      return await this.httpService.axiosRef.delete(url, { params, headers });
    } catch (error) {
      this.loggerService.sendDebug({
        message: `${InternalMessages.DELETE_REQUEST} ${error}`,
        methodName: this.delete.name,
      });
      return error;
    }
  }
}
