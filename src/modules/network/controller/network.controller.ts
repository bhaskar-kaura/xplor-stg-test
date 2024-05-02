import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { DomainReadService } from '../services/domain-read.service'
import { OnboardNetworkDto } from '../dto/onboard-network.dto'
import { NetworkCreateService } from '../services/network-create.service'
import { GetOnboardedNetworksDto } from '../dto/get-onboarded-networks.dto'
import { NetworkReadService } from '../services/network-read.service'

@Controller('network')
export class NetworkController {
  constructor(
    private readonly domainReadService: DomainReadService,
    private readonly networkCreateService: NetworkCreateService,
    private readonly networkReadService: NetworkReadService,
  ) {}

  @Get('/domains')
  async getNetworkDomains() {
    return this.domainReadService.getDomainsList()
  }

  // Creates a network with the required fields for network onboarding.
  @Post('/onboarding')
  async onboardNetwork(@Body() onboardNetworkBody: OnboardNetworkDto) {
    return await this.networkCreateService.createNetwork(onboardNetworkBody)
  }

  // Returns the list of all the onboarded networks.
  @Get()
  async getAllNetworks(@Query() networkSearchBody: GetOnboardedNetworksDto) {
    return await this.networkReadService.getAllNetworks(networkSearchBody)
  }

  @Get('/:id')
  async getNetworkId(@Param('id') networkId: string) {
    return await this.networkReadService.getNetworkById(networkId)
  }
}
