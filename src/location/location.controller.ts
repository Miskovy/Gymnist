import { Controller, Get, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateCountryDto, CreateCityDto, CreateStateDto } from './dto/create-location.dto';
import { Country } from './entities/country.entity';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // COUNTRY ENDPOINTS
  @Post('countries')
  async createCountry(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return this.locationService.createCountry(createCountryDto);
  }

  @Get('countries')
  async findAllCountries(): Promise<Country[]> {
    return this.locationService.findAllCountries();
  }

  // CITY ENDPOINTS
  @Post('cities')
  async createCity(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.locationService.createCity(createCityDto);
  }

  @Get('cities')
  async findAllCities(): Promise<City[]> {
    return this.locationService.findAllCities();
  }

  // STATE ENDPOINTS
  @Post('states')
  async createState(@Body() createStateDto: CreateStateDto): Promise<State> {
    return this.locationService.createState(createStateDto);
  }

  @Get('states')
  async findAllStates(): Promise<State[]> {
    return this.locationService.findAllStates();
  }
}