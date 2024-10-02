import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

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
