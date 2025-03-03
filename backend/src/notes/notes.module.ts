import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './services/notes.service';
import { Note } from './entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}