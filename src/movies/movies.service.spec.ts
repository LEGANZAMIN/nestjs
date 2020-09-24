import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  // select all
  describe("getAll", () => {

    it("should return a array", () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    })
  })

  // select one
  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        generes: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();

      expect(movie.id).toEqual(1);

    });

    it("should throw a NotFoundException", () => {
      try {
        service.getOne(888);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 888 not found.')

      }
    })


  });


  // delete 
  describe("deleteOne", () => {

    it("delete a movie.", () => {
      service.create({
        title: 'Test Movie',
        generes: ['test'],
        year: 2000,
      });
      //console.log(service.getAll());
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      //expect(afterDelete.length).toEqual(allMovies.length - 1);
      expect(afterDelete).toBeLessThan(beforeDelete);
    })

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(10000);

      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);

      }
    })

  })


  // create
  describe("create", () => {

    it("should create a movie", () => {

      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        generes: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);


    })
  })

  // update
  describe("update", () => {

    it("should update a movie", () => {
      service.create({
        title: 'Test Movie',
        generes: ['test'],
        year: 2000,
      });

      service.update(1, { title: 'test update' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('test update');
    })


    it('should throw a NotFoundException', () => {
      try {
        service.update(10000, { title: 'ttt' });

      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);

      }
    })

  })


});
