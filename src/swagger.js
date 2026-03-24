// Swagger Configuration
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Management Dashboard API',
      version: '1.0.0',
      description: 'RESTful API for managing employees with full CRUD operations, search, filtering, and pagination',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Employee: {
          type: 'object',
          required: ['name', 'email', 'phone', 'department', 'role', 'joiningDate', 'salary', 'status'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated employee ID',
              example: '1',
            },
            name: {
              type: 'string',
              description: 'Full name of the employee',
              example: 'John Anderson',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address (must be unique)',
              example: 'john.anderson@company.com',
            },
            phone: {
              type: 'string',
              description: 'Phone number',
              example: '+1-555-0101',
            },
            department: {
              type: 'string',
              enum: ['Engineering', 'Marketing', 'HR', 'Sales', 'Finance', 'Operations'],
              description: 'Department name',
              example: 'Engineering',
            },
            role: {
              type: 'string',
              description: 'Job role/position',
              example: 'Senior Software Engineer',
            },
            joiningDate: {
              type: 'string',
              format: 'date',
              description: 'Date when employee joined',
              example: '2020-01-15',
            },
            salary: {
              type: 'number',
              description: 'Annual salary',
              example: 95000,
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive'],
              description: 'Employment status',
              example: 'active',
            },
            address: {
              type: 'string',
              description: 'Full address (optional)',
              example: '123 Main St, San Francisco, CA 94102',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'admin@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'admin123',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Login successful',
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: 'admin-001' },
                    name: { type: 'string', example: 'Admin User' },
                    email: { type: 'string', example: 'admin@example.com' },
                    role: { type: 'string', example: 'admin' },
                  },
                },
                token: {
                  type: 'string',
                  example: 'mock-jwt-token-1234567890',
                },
              },
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation successful',
            },
            data: {
              type: 'object',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Employee',
              },
            },
            pagination: {
              type: 'object',
              properties: {
                currentPage: { type: 'integer', example: 1 },
                totalPages: { type: 'integer', example: 3 },
                totalItems: { type: 'integer', example: 22 },
                limit: { type: 'integer', example: 10 },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication endpoints',
      },
      {
        name: 'Employees',
        description: 'Employee management endpoints',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Employee Management API Docs',
  }));

  // JSON endpoint for swagger spec
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

export default swaggerSpec;
