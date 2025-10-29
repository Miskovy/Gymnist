import express from 'express';
import * as packageController from './controller';
import { validatePackage, validate } from './validator';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.use(verifyToken);

router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackageById);
router.post('/', validatePackage, validate, packageController.createPackage);
router.put('/:id', packageController.updatePackage);
router.delete('/:id', packageController.deletePackage);

export default router;