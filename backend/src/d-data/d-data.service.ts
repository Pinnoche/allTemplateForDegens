import { Injectable } from '@nestjs/common';
import { CreateDDatumDto } from './dto/create-d-datum.dto';
import { UpdateDDatumDto } from './dto/update-d-datum.dto';

@Injectable()
export class DDataService {
  create(createDDatumDto: CreateDDatumDto) {
    return 'This action adds a new dDatum';
  }

  findAll() {
    return `This action returns all dData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dDatum`;
  }

  update(id: number, updateDDatumDto: UpdateDDatumDto) {
    return `This action updates a #${id} dDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} dDatum`;
  }
}
