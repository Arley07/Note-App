import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { Note } from '../entities/note.entity';

@Controller('notes') // Asegúrate de que la ruta base sea 'notes'
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post() // Ruta POST /notes
  create(@Body() note: Note): Promise<Note> {
    return this.notesService.create(note);
  }

  @Get(':archived') // Ruta GET /notes/false o /notes/true
  findAll(@Param('archived') archived: string): Promise<Note[]> {
    const isArchived = archived === 'true'; // Convierte el string a booleano
    return this.notesService.findAll(isArchived);
  }

  @Put(':id') // Ruta PUT /notes/1
  update(@Param('id') id: string, @Body() note: Note): Promise<Note> {
    return this.notesService.update(+id, note);
  }

  @Delete(':id') // Ruta DELETE /notes/1
  remove(@Param('id') id: string): Promise<void> {
    return this.notesService.remove(+id);
  }
}