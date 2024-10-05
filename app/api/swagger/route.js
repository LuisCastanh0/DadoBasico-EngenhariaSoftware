// app/api/swagger/route.js
import { NextResponse } from 'next/server';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API do Sistema de Criação de Bases de Dados',
    version: '1.0.0',
    description: 'Documentação da API do back-end do projeto',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desenvolvimento',
    },
  ],
  components: {
    schemas: {
      TableDefinition: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          columns: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ColumnDefinition',
            },
          },
        },
      },
      ColumnDefinition: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          type: { type: 'string' },
        },
      },
      TableData: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          data: {
            type: 'object',
            description: 'Dados armazenados na tabela, onde as chaves são os nomes das colunas.',
            additionalProperties: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./app/api/**/*.js'], // Ajuste o caminho se necessário
};

const swaggerSpec = swaggerJSDoc(options);

export async function GET(request) {
    return NextResponse.json(swaggerSpec);
  }
