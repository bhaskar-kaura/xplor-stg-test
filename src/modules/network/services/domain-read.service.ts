import { Injectable } from '@nestjs/common'
import { DomainsList } from '../../../common/constants/domains.constant'

@Injectable()
export class DomainReadService {
  async getDomainsList() {
    return DomainsList
  }
}
