import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { NetworkCreateService } from '../services/network-create.service'
import { NetworkModel, NetworkSchema } from '../schema/network.schema'
import { DomainReadService } from '../services/domain-read.service'
import { NetworkController } from '../controller/network.controller'
import { NetworkReadService } from '../services/network-read.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: NetworkModel, schema: NetworkSchema }])],
  providers: [NetworkCreateService, DomainReadService, NetworkReadService],
  exports: [NetworkCreateService, NetworkReadService, DomainReadService],
  controllers: [NetworkController],
})
export class NetworkModules {}
