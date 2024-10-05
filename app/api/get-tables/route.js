import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/get-tables:
 *   get:
 *     summary: Retorna a lista de tabelas definidas.
 *     tags:
 *       - Tabelas
 *     responses:
 *       200:
 *         description: Lista de tabelas obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tables:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TableDefinition'
 *       500:
 *         description: Erro ao obter tabelas.
 */

export async function GET(request) {
  try {
    const tables = await prisma.tableDefinition.findMany();
    return NextResponse.json({ tables }, { status: 200 });
  } catch (error) {
    console.error('Erro ao obter tabelas:', error);
    return NextResponse.json({ error: 'Erro ao obter tabelas.' }, { status: 500 });
  }
}