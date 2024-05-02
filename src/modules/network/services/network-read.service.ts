import { Injectable, NotFoundException } from '@nestjs/common'
import { Network, NetworkModel } from '../schema/network.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { GetOnboardedNetworksDto } from '../dto/get-onboarded-networks.dto'
import { HttpResponseMessage } from 'src/common/constants/http-response-message'
import { getSuccessResponse } from 'src/utils/get-success-response'
import { NetworkErrorMessages } from 'src/common/constants/error.messages'

@Injectable()
export class NetworkReadService {
  constructor(@InjectModel(NetworkModel) private readonly onboardedNetworkModel: Model<Network>) {}

  // Returns all the onboarded networks
  async getAllNetworks(getOnboardedNetworksBody: GetOnboardedNetworksDto): Promise<any> {
    const query: any = {}
    if (getOnboardedNetworksBody.searchQuery) {
      query.$or = [
        { name: { $regex: getOnboardedNetworksBody.searchQuery, $options: 'i' } },
        { domains: { $regex: getOnboardedNetworksBody.searchQuery, $options: 'i' } },
      ]
    }

    const skip = (getOnboardedNetworksBody.page - 1) * getOnboardedNetworksBody.pageSize
    const networks = await this.onboardedNetworkModel
      .find(query)
      .skip(skip)
      .limit(getOnboardedNetworksBody.pageSize)
      .exec()

    return getSuccessResponse(networks, HttpResponseMessage.OK)
  }

  async getNetworkById(networkId): Promise<any> {
    const network = await this.onboardedNetworkModel.findOne({ _id: networkId })

    if (!network) {
      throw new NotFoundException(NetworkErrorMessages.NETWORK_NOT_FOUND)
    }

    return getSuccessResponse(network, HttpResponseMessage.OK)
  }
}
