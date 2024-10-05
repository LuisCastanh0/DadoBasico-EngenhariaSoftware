import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/add-data:
 *   post:
 *     summary: Adiciona dados a uma tabela específica.
 *     tags:
 *       - Dados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tableId:
 *                 type: integer
 *                 example: 1
 *               data:
 *                 type: object
 *                 description: Objeto com os dados a serem inseridos, onde as chaves são os nomes das colunas.
 *                 example:
 *                   Nome: "João"
 *                   Idade: "30"
 *     responses:
 *       200:
 *         description: Dados adicionados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dados adicionados com sucesso."
 *       400:
 *         description: Dados inválidos para adicionar.
 *       500:
 *         description: Erro ao adicionar dados.
 */

export async function POST(request) {
  try {
    const { tableId, data } = await request.json();

    if (!tableId || !data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Dados inválidos para adicionar.' },
        { status: 400 }
      );
    }

    await prisma.tableData.create({
      data: {
        data: JSON.stringify(data),
        table: { connect: { id: parseInt(tableId) } },
      },
    });

    return NextResponse.json({ message: 'Dados adicionados com sucesso.' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao adicionar dados:', error);
    return NextResponse.json({ error: 'Erro ao adicionar dados.' }, { status: 500 });
  }
}
