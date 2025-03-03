import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(note: Partial<Note>): Promise<Note> {
    return this.notesRepository.save(note);
  }

  async findAll(archived: boolean): Promise<Note[]> {
    return this.notesRepository.find({ where: { archived } });
  }

  async update(id: number, note: Partial<Note>): Promise<Note> {
    await this.notesRepository.update(id, note);
    const updatedNote = await this.notesRepository.findOne({ where: { id } });
    if (!updatedNote) {
      throw new Error(`Note with ID ${id} not found`);
    }
    return updatedNote;
  }

  async remove(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }
}