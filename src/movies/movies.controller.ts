import { Controller, Get, Param, Post, Delete, Patch, Body, Query, Req, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get("search")
    search(@Query("year") searchYear: string) {
        return `We are searching for a movie made after: ${searchYear}`
    }

    @Get("/:id")
    getOne(@Param('id') movieId: number): Movie {
        // console.log(typeof movieId)
        return this.moviesService.getOne(movieId)
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {

        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch(':id')
    patch(@Param('id') movieId: number, @Body() updatedData: UpdateMovieDto) {
        return this.moviesService.update(movieId, updatedData);
    }


}