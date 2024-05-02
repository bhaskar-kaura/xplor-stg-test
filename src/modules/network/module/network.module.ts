import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { NetworkCreateService } from '../services/network-create.service'
import { NetworkModel, NetworkSchema } from '../schema/network.schema'
import { DomainReadService } from '../services/domain-read.service'
import { NetworkController } from '../controller/network.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: NetworkModel, schema: NetworkSchema }])],
  providers: [NetworkCreateService, DomainReadService],
  exports: [NetworkCreateService],
  controllers: [NetworkController],
})
export class NetworkModules {}
