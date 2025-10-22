import { Request, Response } from 'express';
import { Country, City, State } from './model';

// Country Controllers
export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const countries = await Country.findAll();
    return res.status(200).json(countries);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching countries', error });
  }
};

export const getCountryById = async (req: Request, res: Response) => {
  try {
    const country = await Country.findByPk(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    return res.status(200).json(country);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching country', error });
  }
};

export const createCountry = async (req: Request, res: Response) => {
  try {
    const country = await Country.create(req.body);
    return res.status(201).json(country);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating country', error });
  }
};

// City Controllers
export const getAllCities = async (req: Request, res: Response) => {
  try {
    const cities = await City.findAll({
      include: [{ model: Country }]
    });
    return res.status(200).json(cities);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching cities', error });
  }
};

export const getCityById = async (req: Request, res: Response) => {
  try {
    const city = await City.findByPk(req.params.id, {
      include: [{ model: Country }]
    });
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    return res.status(200).json(city);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching city', error });
  }
};

export const createCity = async (req: Request, res: Response) => {
  try {
    const city = await City.create(req.body);
    return res.status(201).json(city);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating city', error });
  }
};

// State Controllers
export const getAllStates = async (req: Request, res: Response) => {
  try {
    const states = await State.findAll({
      include: [{ model: City, include: [{ model: Country }] }]
    });
    return res.status(200).json(states);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching states', error });
  }
};

export const getStateById = async (req: Request, res: Response) => {
  try {
    const state = await State.findByPk(req.params.id, {
      include: [{ model: City, include: [{ model: Country }] }]
    });
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }
    return res.status(200).json(state);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching state', error });
  }
};

export const createState = async (req: Request, res: Response) => {
  try {
    const state = await State.create(req.body);
    return res.status(201).json(state);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating state', error });
  }
};