import express from 'express';
import {
  getAllAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  addPrivilegesAdmin,
  getAllPrivileges
} from './controller';
import {
  validateAdmin,
  validateAdminUpdate,
  validateAdminId,
  validatePrivileges
} from './validator';

const router = express.Router();

// Admin routes
router.get('/admins', getAllAdmins);
router.get('/admins/:id', validateAdminId, getAdmin);
router.post('/admins', validateAdmin, createAdmin);
router.put('/admins/:id', validateAdminId, validateAdminUpdate, updateAdmin);
router.delete('/admins/:id', validateAdminId, deleteAdmin);

// Privilege routes
router.get('/privileges', getAllPrivileges);
router.post('/admins/:id/privileges', validateAdminId, validatePrivileges, addPrivilegesAdmin);

export default router;