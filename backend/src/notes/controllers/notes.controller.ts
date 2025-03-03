import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { Note } from '../entities/note.entity';
import { CreateNoteDto } from '../dtos/create-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() note: CreateNoteDto): Promise<Note> {
    return this.notesService.create(note);
  }

  @Get(':archived')
  findAll(@Param('archived') archived: string): Promise<Note[]> {
    const isArchived = archived === 'true';
    return this.notesService.findAll(isArchived);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() note: Partial<Note>): Promise<Note> {
    return this.notesService.update(+id, note);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.notesService.remove(+id);
  }
}