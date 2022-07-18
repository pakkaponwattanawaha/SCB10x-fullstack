import { JwtGuard } from './../auth/guards/jwt.guard';
import { PartyService } from './party.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PartyDocument } from './party.schema';
import { CreatePartyDto } from './dto/party.dto';
import { OwnGuard } from './guards/own.guard';

@Controller('party')
export class PartyController {
  constructor(private partyService: PartyService) {}

  @Post()
  createparty(
    @Body('email') email: string,
    @Body('createPartyDto') createPartyDto: CreatePartyDto,
  ): Promise<PartyDocument> {
    console.log(email, createPartyDto);
    return this.partyService.create(email, createPartyDto);
  }

  @Get()
  findAllPartys(): Promise<PartyDocument[]> {
    return this.partyService.findAll();
  }

  @UseGuards(JwtGuard)
  @UseGuards(OwnGuard)
  @Get(':id')
  findparty(@Param('id') id: string): Promise<PartyDocument> {
    return this.partyService.findById(id);
  }

  @Patch()
  updateparty(
    @Body('id') id: string,
    @Body('email') email: string,
  ): Promise<PartyDocument> {
    return this.partyService.update(id, email);
  }

  // update (join)
  //  - cannot join your own
  //  - cannot join twice
  //  - cannot join when exceed limit

  // findby id

  // findby owner
  // push to github

  @Delete(':id')
  deleteparty(@Param('id') id: string) {
    return this.partyService.delete(id);
  }
}
