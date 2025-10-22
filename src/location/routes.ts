import express from 'express';
import * as locationController from './controller';
import { validateCountry, validateCity, validateState, validate } from './validator';

const router = express.Router();

// Country routes
router.get('/countries', locationController.getAllCountries);
router.get('/countries/:id', locationController.getCountryById);
router.post('/countries', validateCountry, validate, locationController.createCountry);

// City routes
router.get('/cities', locationController.getAllCities);
router.get('/cities/:id', locationController.getCityById);
router.post('/cities', validateCity, validate, locationController.createCity);

// State routes
router.get('/states', locationController.getAllStates);
router.get('/states/:id', locationController.getStateById);
router.post('/states', validateState, validate, locationController.createState);

export default router;