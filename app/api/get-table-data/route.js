import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/get-table-data:
 *   get:
 *     summary: Retorna os dados armazenados em uma tabela específica.
 *     tags:
 *       - Dados
 *     parameters:
 *       - in: query
 *         name: tableId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tabela cujos dados devem ser retornados.
 *     responses:
 *       200:
 *         description: Dados da tabela obtidos com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TableData'
 *       400:
 *         description: tableId é necessário.
 *       500:
 *         description: Erro ao obter dados da tabela.
 */

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tableId = searchParams.get('tableId');

    if (!tableId) {
      return NextResponse.json({ error: 'tableId é necessário.' }, { status: 400 });
    }

    const data = await prisma.tableData.findMany({
      where: { tableId: parseInt(tableId) },
    });

    const parsedData = data.map((row) => ({
      id: row.id,
      data: JSON.parse(row.data),
    }));

    return NextResponse.json({ data: parsedData }, { status: 200 });
  } catch (error) {
    console.error('Erro ao obter dados da tabela:', error);
    return NextResponse.json({ error: 'Erro ao obter dados da tabela.' }, { status: 500 });
  }
}