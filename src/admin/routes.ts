import express from 'express';
import {
  getAllAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  addPrivilegesAdmin,
  getAllPrivileges,
  createPrivilege
} from './controller';
import {
  validateAdmin,
  validateAdminUpdate,
  validateAdminId,
  validatePrivileges
} from './validator';

const router = express.Router();

// Privilege routes
router.post('/privileges', createPrivilege);
router.get('/privileges', getAllPrivileges);
router.post('/:id/privileges', validateAdminId, validatePrivileges, addPrivilegesAdmin);

// Admin routes
router.get('/', getAllAdmins);
router.get('/:id', validateAdminId, getAdmin);
router.post('/', validateAdmin, createAdmin);
router.put('/:id', validateAdminId, validateAdminUpdate, updateAdmin);
router.delete('/:id', validateAdminId, deleteAdmin);



export default router;