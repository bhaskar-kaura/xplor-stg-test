import { Controller, Get, Post } from '@nestjs/common'
import { DomainReadService } from '../services/domain-read.service'
import { OnboardNetworkDto } from '../dto/onboard-network.dto'
import { NetworkCreateService } from '../services/network-create.service'
import { GetOnboardedNetworksDto } from '../dto/get-onboarded-networks.dto'

@Controller('network')
export class NetworkController {
  constructor(
    private readonly domainReadService: DomainReadService,
    private readonly networkCreateService: NetworkCreateService,
  ) {}

  @Get('/domains')
  async getNetworkDomains() {
    return this.domainReadService.getDomainsList()
  }

  // Creates a network with the required fields for network onboarding.
  @Post('/onboarding')
  async onboardNetwork(onboardNetworkBody: OnboardNetworkDto) {
    return this.networkCreateService.createNetwork(onboardNetworkBody)
  }

  // Creates a network with the required fields for network onboarding.
  @Get('')
  async getAllNetworks(@Params() networkSearchBody: GetOnboardedNetworksDto) {
    
  }
}
function Params(): (target: NetworkController, propertyKey: 'getAllNetworks', parameterIndex: 0) => void {
  throw new Error('Function not implemented.')
}
