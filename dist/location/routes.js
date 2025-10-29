"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locationController = __importStar(require("./controller"));
const validator_1 = require("./validator");
const router = express_1.default.Router();
// Country routes
router.get('/countries', locationController.getAllCountries);
router.get('/countries/:id', locationController.getCountryById);
router.post('/countries', validator_1.validateCountry, validator_1.validate, locationController.createCountry);
router.put('/countries/:id', validator_1.validateCountry, validator_1.validate, locationController.updateCountry);
router.delete('/countries/:id', locationController.deleteCountry);
// City routes
router.get('/cities', locationController.getAllCities);
router.get('/cities/:id', locationController.getCityById);
router.post('/cities', validator_1.validateCity, validator_1.validate, locationController.createCity);
router.put('/cities/:id', locationController.updateCity);
router.delete('/cities/:id', locationController.deleteCity);
// State routes
router.get('/states', locationController.getAllStates);
router.get('/states/:id', locationController.getStateById);
router.post('/states', validator_1.validateState, validator_1.validate, locationController.createState);
router.put('/states/:id', locationController.updateState);
router.delete('/states/:id', locationController.deleteState);
exports.default = router;
