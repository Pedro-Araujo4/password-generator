import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Password Generator API',
      version: '1.0.0',
      description: 'API profissional para geração e gerenciamento de senhas seguras',
    },
    paths: {
  '/api/generate': {
    post: {
      summary: 'Gera uma nova senha segura',
      tags: ['Password'],
      parameters: [
        {
          name: 'length',
          in: 'query',
          description: 'Comprimento da senha',
          required: false,
          schema: {
            type: 'integer',
            default: 12,
            minimum: 4
          }
        },
        {
          name: 'hasSymbols',
          in: 'query',
          description: 'Incluir símbolos na senha?',
          required: false,
          schema: {
            type: 'boolean',
            default: true
          }
        },
        {
          name: 'noDuplication',
          in: 'query',
          description: 'Evitar caracteres duplicados?',
          required: false,
          schema: {
            type: 'boolean',
            default: false
          }
        }
      ],
      responses: {
        200: {
          description: 'Sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  password: { type: 'string' }
                 }
               }
              }
            }
          }
        }
       }
      },
      '/api/passwords': {
        get: {
          summary: 'Lista todas as senhas gravadas',
          tags: ['Management'],
          responses: {
            200: { description: 'Lista de senhas retornada com sucesso' }
          }
        },
        delete: {
          summary: 'Deleta todas as senhas (Requer Admin Key)',
          tags: ['Management'],
          security: [{ AdminAuth: [] }],
          responses: {
            200: { description: 'Todas as senhas foram removidas' }
          }
        }
      },
      '/api/passwords/{id}': {
        get: {
          summary: 'Busca os detalhes de uma senha específica',
          tags: ['Management'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'string' },
              description: 'ID único da senha'
            }
          ],
          responses: {
            200: { description: 'Senha encontrada' },
            404: { description: 'Senha não encontrada' }
          }
        },
        delete: {
          summary: 'Remove uma senha específica (Requer Admin Key)',
          tags: ['Management'],
          security: [{ AdminAuth: [] }],
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
            401: { description: 'Chave inválida' },
            404: { description: 'Senha não encontrada' }
          }
        }
      }
    }, // Fim do paths
    components: {
      securitySchemes: {
        AdminAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-admin-key'
        }
      }
    }
  },
  apis: [], // Deixamos vazio para evitar os erros de indentação nos arquivos de rota
};

export const swaggerSpec = swaggerJSDoc(options);