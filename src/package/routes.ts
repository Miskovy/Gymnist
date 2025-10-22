import express from 'express';
import * as packageController from './controller';
import { validatePackage, validate } from './validator';

const router = express.Router();

router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackageById);
router.post('/', validatePackage, validate, packageController.createPackage);
router.put('/:id', validatePackage, validate, packageController.updatePackage);
router.delete('/:id', packageController.deletePackage);

export default router;