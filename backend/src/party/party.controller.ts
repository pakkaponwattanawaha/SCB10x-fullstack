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

  @Get()
  findAllPartys(): Promise<PartyDocument[]> {
    return this.partyService.findAll();
  }

  @Get('name/:name')
  findPartyByName(@Param('name') name: string): Promise<PartyDocument[]> {
    return this.partyService.findByName(name);
  }

  @Get(':id')
  findParty(@Param('id') id: string): Promise<PartyDocument> {
    return this.partyService.findById(id);
  }
  @UseGuards(JwtGuard)
  @Post()
  createparty(
    @Body('email') email: string,
    @Body('createPartyDto') createPartyDto: CreatePartyDto,
  ): Promise<PartyDocument> {
    console.log(email, createPartyDto);
    return this.partyService.create(email, createPartyDto);
  }

  @UseGuards(JwtGuard)
  @Patch()
  joinParty(
    @Body('id') id: string,
    @Body('email') email: string,
  ): Promise<PartyDocument> {
    return this.partyService.update(id, email);
  }

  @Delete(':id')
  deleteparty(@Param('id') id: string) {
    return this.partyService.delete(id);
  }
}
