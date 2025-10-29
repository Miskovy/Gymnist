"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.createState = exports.getStateById = exports.getAllStates = exports.deleteCity = exports.updateCity = exports.createCity = exports.getCityById = exports.getAllCities = exports.deleteCountry = exports.updateCountry = exports.createCountry = exports.getCountryById = exports.getAllCountries = void 0;
const model_1 = require("./model");
// Country Controllers
const getAllCountries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield model_1.Country.findAll();
        return res.status(200).json(countries);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching countries', error });
    }
});
exports.getAllCountries = getAllCountries;
const getCountryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = yield model_1.Country.findByPk(req.params.id);
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        return res.status(200).json(country);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching country', error });
    }
});
exports.getCountryById = getCountryById;
const createCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = yield model_1.Country.create(req.body);
        return res.status(201).json(country);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating country', error });
    }
});
exports.createCountry = createCountry;
const updateCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield model_1.Country.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated === 0) {
            return res.status(404).json({ message: 'Country not found' });
        }
        const updatedCountry = yield model_1.Country.findByPk(req.params.id);
        return res.status(200).json(updatedCountry);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating country', error });
    }
});
exports.updateCountry = updateCountry;
const deleteCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield model_1.Country.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Country not found' });
        }
        return res.status(200).json({ message: 'Country deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting country', error });
    }
});
exports.deleteCountry = deleteCountry;
// City Controllers
const getAllCities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = yield model_1.City.findAll({
            include: [{ model: model_1.Country }]
        });
        return res.status(200).json(cities);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching cities', error });
    }
});
exports.getAllCities = getAllCities;
const getCityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = yield model_1.City.findByPk(req.params.id, {
            include: [{ model: model_1.Country }]
        });
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        return res.status(200).json(city);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching city', error });
    }
});
exports.getCityById = getCityById;
const createCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = yield model_1.City.create(req.body);
        return res.status(201).json(city);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating city', error });
    }
});
exports.createCity = createCity;
const updateCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield model_1.City.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated === 0) {
            return res.status(404).json({ message: 'City not found' });
        }
        const updatedCity = yield model_1.City.findByPk(req.params.id, {
            include: [{ model: model_1.Country }]
        });
        return res.status(200).json(updatedCity);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating city', error });
    }
});
exports.updateCity = updateCity;
const deleteCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield model_1.City.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: 'City not found' });
        }
        return res.status(200).json({ message: 'City deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting city', error });
    }
});
exports.deleteCity = deleteCity;
// State Controllers
const getAllStates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const states = yield model_1.State.findAll({
            include: [{ model: model_1.City, include: [{ model: model_1.Country }] }]
        });
        return res.status(200).json(states);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching states', error });
    }
});
exports.getAllStates = getAllStates;
const getStateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const state = yield model_1.State.findByPk(req.params.id, {
            include: [{ model: model_1.City, include: [{ model: model_1.Country }] }]
        });
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        return res.status(200).json(state);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching state', error });
    }
});
exports.getStateById = getStateById;
const createState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const state = yield model_1.State.create(req.body);
        return res.status(201).json(state);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating state', error });
    }
});
exports.createState = createState;
const updateState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield model_1.State.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated === 0) {
            return res.status(404).json({ message: 'State not found' });
        }
        const updatedState = yield model_1.State.findByPk(req.params.id, {
            include: [{ model: model_1.City, include: [{ model: model_1.Country }] }]
        });
        return res.status(200).json(updatedState);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating state', error });
    }
});
exports.updateState = updateState;
const deleteState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield model_1.State.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: 'State not found' });
        }
        return res.status(200).json({ message: 'State deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting state', error });
    }
});
exports.deleteState = deleteState;
