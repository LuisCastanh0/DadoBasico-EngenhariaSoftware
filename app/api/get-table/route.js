import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/get-table:
 *   get:
 *     summary: Retorna a definição de uma tabela específica.
 *     tags:
 *       - Tabelas
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tabela a ser obtida.
 *     responses:
 *       200:
 *         description: Tabela obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 table:
 *                   $ref: '#/components/schemas/TableDefinition'
 *       400:
 *         description: ID da tabela é necessário.
 *       404:
 *         description: Tabela não encontrada.
 *       500:
 *         description: Erro ao obter tabela.
 */

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID da tabela é necessário.' }, { status: 400 });
    }

    const table = await prisma.tableDefinition.findUnique({
      where: { id: parseInt(id) },
      include: { columns: true },
    });

    if (!table) {
      return NextResponse.json({ error: 'Tabela não encontrada.' }, { status: 404 });
    }

    return NextResponse.json({ table }, { status: 200 });
  } catch (error) {
    console.error('Erro ao obter tabela:', error);
    return NextResponse.json({ error: 'Erro ao obter tabela.' }, { status: 500 });
  }
}