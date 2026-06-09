import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>) {}

  findAll(): Promise<Tag[]> { return this.tagsRepository.find(); }
  findOne(id: number): Promise<Tag | null> { return this.tagsRepository.findOne({ where: { id } }); }
  create(dto: CreateTagDto): Promise<Tag> {
    return this.tagsRepository.save(this.tagsRepository.create({ name: dto.name }));
  }
  async update(id: number, dto: UpdateTagDto): Promise<Tag | null> {
    const tag = await this.findOne(id);
    if (!tag) return null;
    Object.assign(tag, dto);
    return this.tagsRepository.save(tag);
  }
  async remove(id: number): Promise<boolean> {
    const tag = await this.findOne(id);
    if (!tag) return false;
    await this.tagsRepository.remove(tag);
    return true;
  }
}
