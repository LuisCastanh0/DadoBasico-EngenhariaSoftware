import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/create-table:
 *   post:
 *     summary: Cria uma nova tabela com colunas definidas pelo usuário.
 *     tags:
 *       - Tabelas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tableName:
 *                 type: string
 *                 example: Usuarios
 *               columns:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Nome
 *                     type:
 *                       type: string
 *                       example: text
 *     responses:
 *       200:
 *         description: Tabela criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 table:
 *                   $ref: '#/components/schemas/TableDefinition'
 *       400:
 *         description: Dados inválidos para criação da tabela.
 *       500:
 *         description: Erro ao criar tabela.
 */

export async function POST(request) {
  try {
    const { tableName, columns } = await request.json();

    if (!tableName || !columns || !Array.isArray(columns)) {
      return NextResponse.json(
        { error: 'Dados inválidos para criação da tabela.' },
        { status: 400 }
      );
    }

    const table = await prisma.tableDefinition.create({
      data: {
        name: tableName,
        columns: {
          create: columns.map((column) => ({
            name: column.name,
            type: column.type,
          })),
        },
      },
    });

    return NextResponse.json({ table }, { status: 200 });
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
    return NextResponse.json({ error: 'Erro ao criar tabela.' }, { status: 500 });
  }
}