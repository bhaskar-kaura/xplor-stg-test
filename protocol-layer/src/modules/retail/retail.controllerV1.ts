import { Controller } from '@nestjs/common';
import { RetailService } from './services/retail.serviceV1';
@Controller({ version: '1', path: 'retail' })
export class RetailController {
  constructor(private readonly retailService: RetailService) {}
}
