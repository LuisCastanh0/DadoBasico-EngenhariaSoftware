import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

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