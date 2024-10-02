import prisma from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const tables = await prisma.tableDefinition.findMany();
    return NextResponse.json({ tables }, { status: 200 });
  } catch (error) {
    console.error('Erro ao obter tabelas:', error);
    return NextResponse.json({ error: 'Erro ao obter tabelas.' }, { status: 500 });
  }
}