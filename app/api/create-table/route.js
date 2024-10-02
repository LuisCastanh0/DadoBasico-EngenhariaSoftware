import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

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