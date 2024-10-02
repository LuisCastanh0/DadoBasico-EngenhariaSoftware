import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tableId, data } = req.body;

    try {
      await prisma.tableData.create({
        data: {
          data,
          table: { connect: { id: tableId } },
        },
      });
      res.status(200).json({ message: 'Dados adicionados com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar dados.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
