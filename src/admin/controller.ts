import { Request, Response } from 'express';
import { AdminModel, PrivilegeModel, AdminPrivilegeModel } from './model';
import bcrypt from 'bcrypt';

// Helper function for success response
const successResponse = (res: Response, data: any, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data
  });
};

// Admin Controllers
export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await AdminModel.findAll();
    return successResponse(res, { admins }, 200);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const admin = await AdminModel.findByPk(id);
    
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin Not Found' });
    }

    // Get admin privileges
    const adminPrivileges = await AdminPrivilegeModel.findAll({
      where: { adminId: id },
      include: [{ model: PrivilegeModel, as: 'privilege' }]
    });

    // Group privileges by name
    const groupedPrivileges = adminPrivileges.reduce((acc: any, curr: any) => {
      const privilege = curr.privilege;
      if (!privilege) return acc;
      
      if (!acc[privilege.name]) {
        acc[privilege.name] = [];
      }
      
      acc[privilege.name].push({
        id: privilege.id,
        action: privilege.action,
      });
      
      return acc;
    }, {});

    return successResponse(res, { ...admin.toJSON(), privileges: groupedPrivileges }, 200);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    // Hash password
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
        
    // Create admin
    await AdminModel.create(data);
    
    return successResponse(res, { message: 'Admin Created Successfully' }, 201);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    
    const admin = await AdminModel.findByPk(id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin Not Found' });
    }
    
    // Hash password if provided
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
  
    // Update admin
    await admin.update(data);
    
    return successResponse(res, { message: 'Admin Updated Successfully' }, 200);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    
    const admin = await AdminModel.findByPk(id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin Not Found' });
    }
    
    // Delete admin
    await admin.destroy();
    
    return successResponse(res, { message: 'Admin Deleted Successfully' }, 200);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Privilege Management
export const addPrivilegesAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const privilegesList = req.body.privilegesIds;
    
    const admin = await AdminModel.findByPk(id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin Not Found' });
    }
    
    // Delete existing privileges
    await AdminPrivilegeModel.destroy({ where: { adminId: id } });
    
    // Add new privileges
    const privilegesToAdd = privilegesList.map((privilegeId: number) => ({
      adminId: id,
      privilegeId
    }));
    
    await AdminPrivilegeModel.bulkCreate(privilegesToAdd);
    
    return successResponse(res, { message: 'Admin has privileges successfully' }, 200);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Privilege Controllers
export const getAllPrivileges = async (req: Request, res: Response) => {
  try {
    const privileges = await PrivilegeModel.findAll();
    
    // Group privileges by name
    const grouped = privileges.reduce((acc: any, curr: any) => {
      if (!acc[curr.name]) {
        acc[curr.name] = [];
      }
      
      acc[curr.name].push({
        id: curr.id,
        action: curr.action,
      });
      
      return acc;
    }, {});
    
    return successResponse(res, { privileges: grouped }, 200);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// create privalge
export const createPrivilege = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    await PrivilegeModel.create(data);
    
    return successResponse(res, { message: 'Privilege Created Successfully' }, 201);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updatePrivilege = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    
    const privilege = await PrivilegeModel.findByPk(id);
    if (!privilege) {
      return res.status(404).json({ success: false, message: 'Privilege Not Found' });
    }
    
    await privilege.update(data);
    
    return successResponse(res, { message: 'Privilege Updated Successfully' }, 200);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deletePrivilege = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    
    const privilege = await PrivilegeModel.findByPk(id);
    if (!privilege) {
      return res.status(404).json({ success: false, message: 'Privilege Not Found' });
    }
    
    await privilege.destroy();
    
    return successResponse(res, { message: 'Privilege Deleted Successfully' }, 200);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
