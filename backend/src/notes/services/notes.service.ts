import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { CreateNoteDto } from '../dtos/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(note: CreateNoteDto): Promise<Note> {
    const newNote = this.notesRepository.create(note);
    return this.notesRepository.save(newNote);
  }

  async findAll(archived: boolean): Promise<Note[]> {
    return this.notesRepository.find({ where: { archived } });
  }

  async update(id: number, note: Partial<Note>): Promise<Note> {
    await this.notesRepository.update(id, note);
    const updatedNote = await this.notesRepository.findOne({ where: { id } });
    if (!updatedNote) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return updatedNote;
  }

  async remove(id: number): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }
}