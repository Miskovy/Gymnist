import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';
import { CreateCountryDto, CreateCityDto, CreateStateDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Country) private countryRepo: Repository<Country>,
    @InjectRepository(City) private cityRepo: Repository<City>,
    @InjectRepository(State) private stateRepo: Repository<State>,
  ) {}

  // COUNTRY
  async createCountry(dto: CreateCountryDto): Promise<Country> {
    const country = this.countryRepo.create(dto);
    return this.countryRepo.save(country);
  }

  async findAllCountries() {
    return this.countryRepo.find();
  }

  // CITY  
  async createCity(dto: CreateCityDto): Promise<City> {
    const city = this.cityRepo.create(dto);
    return this.cityRepo.save(city);
  }

  async findAllCities() {
    return this.cityRepo.find({ relations: ['country'] });
  }

  // STATE
  async createState(dto: CreateStateDto): Promise<State> {
    const state = this.stateRepo.create(dto);
    return this.stateRepo.save(state);
  }

  async findAllStates() {
    return this.stateRepo.find({ relations: ['city', 'city.country'] });
  }
}