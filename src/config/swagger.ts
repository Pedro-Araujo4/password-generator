import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Password Safe API',
      version: '1.1.0',
      description: 'API para geração de senhas com cofre protegido por JWT',
    },
    components: {
      securitySchemes: {
        BearerAuth: { // Agora usamos JWT
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token recebido no /auth/login'
        }
      }
    },
    paths: {
      // --- ROTAS DE AUTENTICAÇÃO ---
      '/api/auth/signup': {
        post: {
          summary: 'Cria o usuário mestre',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: { password: { type: 'string' } } } } }
          },
          responses: { 200: { description: 'Usuário criado' } }
        }
      },
      '/api/auth/login': {
        post: {
          summary: 'Realiza login e retorna o Token',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: { password: { type: 'string' } } } } }
          },
          responses: { 200: { description: 'Token gerado com sucesso' } }
        }
      },
      // --- ROTAS DE SENHA ---
      '/api/generate': {
        post: {
          summary: 'Gera uma nova senha (Requer Login)',
          tags: ['Password'],
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: 'length', in: 'query', schema: { type: 'integer', default: 12 } },
            { name: 'hasSymbols', in: 'query', schema: { type: 'boolean', default: true } },
            { name: 'noDuplicates', in: 'query', schema: { type: 'boolean', default: true } },
          ],
          responses: { 200: { description: 'Senha gerada' } }
        }
      },
      '/api/passwords': {
        get: {
          summary: 'Lista todas as senhas (Requer Login)',
          tags: ['Management'],
          security: [{ BearerAuth: [] }],
          responses: { 200: { description: 'Lista retornada' } }
        },
        delete: {
          summary: 'Remove TODAS as senhas do banco (Requer Login)',
          tags: ['Management'],
          security: [{ BearerAuth: [] }], // Proteção JWT
          responses: {
            200: {
              description: 'Sucesso',
              content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string' } } } } }
            },
            401: { description: 'Não autorizado' }
            }
          }
      },
      '/api/passwords/{id}': {
        delete: {
          summary: 'Remove uma senha específica por ID (Requer Login)',
          tags: ['Management'],
          security: [{ BearerAuth: [] }], // Proteção JWT
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'string' },
              description: 'ID da senha a ser removida'
            }
          ],
          responses: {
            200: { description: 'Senha removida com sucesso' },
            401: { description: 'Não autorizado' },
            404: { description: 'ID não encontrado' }
          }
        }
      },
    }
  },
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);