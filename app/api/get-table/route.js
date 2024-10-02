import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  const table = await prisma.tableDefinition.findUnique({
    where: { id: parseInt(id) },
    include: { columns: true },
  });
  res.status(200).json({ table });
}
