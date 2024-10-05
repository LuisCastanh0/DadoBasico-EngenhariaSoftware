// app/api/tables/[tableId]/route.js
// Para App Router (Next.js 13+)

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { tableId } = params;

  try {
    // Buscar a tabela pelo ID
    const table = await prisma.tableDefinition.findUnique({
      where: { id: parseInt(tableId) },
      include: {
        columns: true,
        tableData: true,
      },
    });

    if (!table) {
      return NextResponse.json({ error: 'Tabela não encontrada.' }, { status: 404 });
    }

    return NextResponse.json({ table }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar a tabela:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
