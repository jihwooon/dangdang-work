import { Injectable } from '@nestjs/common';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { JournalPhotos } from './journal-photos.entity';
import { JournalPhotosRepository } from './journal-photos.repository';

@Injectable()
export class JournalPhotosService {
    constructor(private readonly journalPhotosRepository: JournalPhotosRepository) {}

    async create(data: Partial<JournalPhotos>): Promise<JournalPhotos> {
        const newEntity = new JournalPhotos(data);
        return this.journalPhotosRepository.create(newEntity);
    }

    async findOne(where: FindOptionsWhere<JournalPhotos>): Promise<JournalPhotos> {
        return this.journalPhotosRepository.findOne(where);
    }

    async find(where: FindOptionsWhere<JournalPhotos>): Promise<JournalPhotos[]> {
        return this.journalPhotosRepository.find(where);
    }

    async update(
        where: FindOptionsWhere<JournalPhotos>,
        partialEntity: QueryDeepPartialEntity<JournalPhotos>
    ): Promise<UpdateResult> {
        return this.journalPhotosRepository.update(where, partialEntity);
    }

    async updateAndFindOne(
        where: FindOptionsWhere<JournalPhotos>,
        partialEntity: QueryDeepPartialEntity<JournalPhotos>
    ): Promise<JournalPhotos | null> {
        return this.journalPhotosRepository.updateAndFindOne(where, partialEntity);
    }

    async delete(where: FindOptionsWhere<JournalPhotos>): Promise<DeleteResult> {
        return this.journalPhotosRepository.delete(where);
    }
}