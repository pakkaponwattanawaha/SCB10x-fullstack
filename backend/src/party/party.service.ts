import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreatePartyDto } from './dto/party.dto';

import { PartyDocument, UserDetails } from './party.schema';

@Injectable()
export class PartyService {
  constructor(
    private userService: UserService,
    @InjectModel('Party') private partyModel: Model<PartyDocument>,
  ) {}

  async create(
    email: string,
    createPartyDto: CreatePartyDto,
  ): Promise<PartyDocument> {
    console.log(createPartyDto);
    const user = await this.userService.findUserDetailsByEmail(email);
    console.log('user', user);

    const existingParty = await this.findByName(createPartyDto.name);
    console.log('existingParty', existingParty);

    const newparty = new this.partyModel({
      owner: { ...user },
      members: [user],
      ...createPartyDto,
    });
    return newparty.save();
  }

  async findAll(): Promise<PartyDocument[]> {
    return this.partyModel.find().exec();
  }

  async findById(id: string): Promise<PartyDocument> {
    return this.partyModel.findById(id).exec();
  }

  async findByName(name: string): Promise<PartyDocument[]> {
    return this.partyModel.find({ name }).exec();
  }

  async update(
    partyId: string,
    requested_email: string,
  ): Promise<PartyDocument> {
    const requested_user = await this.userService.findUserDetailsByEmail(
      requested_email,
    );
    if (!requested_user)
      throw new HttpException('User not found!', HttpStatus.FORBIDDEN);

    console.log('requested_user', requested_user);
    const existingparty = await this.findById(partyId);
    console.log('existingparty', existingparty);
    if (!existingparty)
      throw new HttpException('Party not found!', HttpStatus.FORBIDDEN);
    else if (existingparty.members.length >= existingparty.limit)
      throw new HttpException('Party is full!', HttpStatus.FORBIDDEN);
    else if (requested_email == existingparty.owner.email)
      throw new HttpException(
        'You are the owner of the party!',
        HttpStatus.FORBIDDEN,
      );
    else if (this.containsObject(requested_user, existingparty.members))
      throw new HttpException(
        'User already joined the party!',
        HttpStatus.FORBIDDEN,
      );
    existingparty.members = [...existingparty.members, requested_user];
    return existingparty.save();
  }
  containsObject(obj: UserDetails, list: UserDetails[]) {
    for (let i = 0; i < list.length; i++) {
      if (list[i]?.email == obj.email && list[i]?.id == String(obj.id)) {
        return true;
      }
    }
    return false;
  }
  async delete(id: string) {
    return this.partyModel.deleteOne({ _id: id }).exec();
  }
}
