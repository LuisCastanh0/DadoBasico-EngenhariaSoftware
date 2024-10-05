// app/api/tables/[tableId]/addData.js
// Para App Router (Next.js 13+)

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const { tableId } = params;

  try {
    const { data } = await request.json();

    // Validar se 'data' é um objeto
    if (typeof data !== 'object' || data === null) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    }

    // Inserir os dados na tabela
    const newData = await prisma.tableData.create({
      data: {
        data, // Assumindo que 'data' é do tipo JSON no schema
        tableId: parseInt(tableId),
      },
    });

    return NextResponse.json({ newData }, { status: 201 });
  } catch (error) {
    console.error('Erro ao adicionar dados à tabela:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
