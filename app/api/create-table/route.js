import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tableName, columns } = req.body;

    try {
      const table = await prisma.tableDefinition.create({
        data: {
          name: tableName,
          columns: {
            create: columns,
          },
        },
      });
      res.status(200).json({ table });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar tabela.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
