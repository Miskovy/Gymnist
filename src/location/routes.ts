import express from 'express';
import * as locationController from './controller';
import { validateCountry, validateCity, validateState, validate } from './validator';

const router = express.Router();

// Country routes
router.get('/countries', locationController.getAllCountries);
router.get('/countries/:id', locationController.getCountryById);
router.post('/countries', validateCountry, validate, locationController.createCountry);
router.put('/countries/:id', validateCountry, validate, locationController.updateCountry);
router.delete('/countries/:id', locationController.deleteCountry);

// City routes
router.get('/cities', locationController.getAllCities);
router.get('/cities/:id', locationController.getCityById);
router.post('/cities', validateCity, validate, locationController.createCity);
router.put('/cities/:id',  locationController.updateCity);
router.delete('/cities/:id', locationController.deleteCity);

// State routes
router.get('/states', locationController.getAllStates);
router.get('/states/:id', locationController.getStateById);
router.post('/states', validateState, validate, locationController.createState);
router.put('/states/:id', locationController.updateState);
router.delete('/states/:id', locationController.deleteState);


export default router;