// Employee Controller - MongoDB Version
import Employee from '../models/Employee.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Get all employees with filters, search, pagination, and sorting
export const getEmployees = async (req, res) => {
  try {
    const {
      search = '',
      department = '',
      status = '',
      page = 1,
      limit = 10,
      sortBy = 'name',
      order = 'asc'
    } = req.query;

    // Build query filter
    const filter = {};

    // Apply search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }

    // Apply department filter
    if (department) {
      filter.department = { $regex: `^${department}$`, $options: 'i' };
    }

    // Apply status filter
    if (status) {
      filter.status = status.toLowerCase();
    }

    // Build sort object
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = { [sortBy]: sortOrder };

    // Get total count for pagination
    const totalEmployees = await Employee.countDocuments(filter);

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    const totalPages = Math.ceil(totalEmployees / limitNum);

    // Execute query with pagination
    const employees = await Employee.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    const pagination = {
      currentPage: pageNum,
      totalPages,
      totalEmployees,
      limit: limitNum,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1
    };

    return successResponse(
      res,
      200,
      'Employees retrieved successfully',
      employees,
      pagination
    );
  } catch (error) {
    console.error('Get employees error:', error);
    return errorResponse(res, 500, 'Server error while fetching employees');
  }
};

// Get employee by ID
export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return errorResponse(res, 404, 'Employee not found');
    }

    return successResponse(res, 200, 'Employee retrieved successfully', employee);
  } catch (error) {
    console.error('Get employee error:', error);
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return errorResponse(res, 404, 'Employee not found');
    }
    return errorResponse(res, 500, 'Server error while fetching employee');
  }
};

// Create new employee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, role, joiningDate, salary, address, status } = req.body;

    // Validation
    const errors = {};
    if (!name || name.trim() === '') errors.name = 'Name is required';
    if (!email || email.trim() === '') errors.email = 'Email is required';
    if (!phone || phone.trim() === '') errors.phone = 'Phone is required';
    if (!department || department.trim() === '') errors.department = 'Department is required';
    if (!role || role.trim() === '') errors.role = 'Role is required';
    if (!joiningDate) errors.joiningDate = 'Joining date is required';
    if (!salary || salary <= 0) errors.salary = 'Valid salary is required';

    if (Object.keys(errors).length > 0) {
      return errorResponse(res, 400, 'Validation failed', errors);
    }

    // Check for duplicate email
    const existingEmployee = await Employee.findOne({ email: email.toLowerCase() });
    if (existingEmployee) {
      return errorResponse(res, 409, 'Email already exists', { email: 'This email is already registered' });
    }

    // Create new employee
    const newEmployee = new Employee({
      name,
      email,
      phone,
      department,
      role,
      joiningDate,
      salary: parseFloat(salary),
      address: address || '',
      status: status || 'active'
    });

    await newEmployee.save();

    return successResponse(res, 201, 'Employee created successfully', newEmployee);
  } catch (error) {
    console.error('Create employee error:', error);
    // Handle duplicate key error
    if (error.code === 11000) {
      return errorResponse(res, 409, 'Email already exists', { email: 'This email is already registered' });
    }
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      return errorResponse(res, 400, 'Validation failed', errors);
    }
    return errorResponse(res, 500, 'Server error while creating employee');
  }
};

// Update employee
export const updateEmployeeData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, department, role, joiningDate, salary, address, status } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return errorResponse(res, 404, 'Employee not found');
    }

    // Validation
    const errors = {};
    if (name && name.trim() === '') errors.name = 'Name cannot be empty';
    if (email && email.trim() === '') errors.email = 'Email cannot be empty';
    if (phone && phone.trim() === '') errors.phone = 'Phone cannot be empty';
    if (department && department.trim() === '') errors.department = 'Department cannot be empty';
    if (role && role.trim() === '') errors.role = 'Role cannot be empty';
    if (salary && salary <= 0) errors.salary = 'Valid salary is required';

    if (Object.keys(errors).length > 0) {
      return errorResponse(res, 400, 'Validation failed', errors);
    }

    // Check for duplicate email (excluding current employee)
    if (email) {
      const existingEmployee = await Employee.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id }
      });
      if (existingEmployee) {
        return errorResponse(res, 409, 'Email already exists', { email: 'This email is already registered' });
      }
    }

    // Build update data
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (department) updateData.department = department;
    if (role) updateData.role = role;
    if (joiningDate) updateData.joiningDate = joiningDate;
    if (salary) updateData.salary = parseFloat(salary);
    if (address !== undefined) updateData.address = address;
    if (status) updateData.status = status;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return successResponse(res, 200, 'Employee updated successfully', updatedEmployee);
  } catch (error) {
    console.error('Update employee error:', error);
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return errorResponse(res, 404, 'Employee not found');
    }
    // Handle duplicate key error
    if (error.code === 11000) {
      return errorResponse(res, 409, 'Email already exists', { email: 'This email is already registered' });
    }
    return errorResponse(res, 500, 'Server error while updating employee');
  }
};

// Update employee status
export const updateEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['active', 'inactive'].includes(status)) {
      return errorResponse(res, 400, 'Invalid status. Must be "active" or "inactive"');
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return errorResponse(res, 404, 'Employee not found');
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return successResponse(res, 200, 'Employee status updated successfully', updatedEmployee);
  } catch (error) {
    console.error('Update employee status error:', error);
    if (error.name === 'CastError') {
      return errorResponse(res, 404, 'Employee not found');
    }
    return errorResponse(res, 500, 'Server error while updating employee status');
  }
};

// Delete employee
export const removeEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return errorResponse(res, 404, 'Employee not found');
    }

    await Employee.findByIdAndDelete(id);

    return successResponse(res, 200, 'Employee deleted successfully', { id });
  } catch (error) {
    console.error('Delete employee error:', error);
    if (error.name === 'CastError') {
      return errorResponse(res, 404, 'Employee not found');
    }
    return errorResponse(res, 500, 'Server error while deleting employee');
  }
};
