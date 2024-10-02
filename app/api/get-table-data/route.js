import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const { tableId } = req.query;

  const data = await prisma.tableData.findMany({
    where: { tableId: parseInt(tableId) },
  });

  res.status(200).json({ data });
}
