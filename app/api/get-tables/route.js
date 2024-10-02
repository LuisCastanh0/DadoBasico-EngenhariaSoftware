import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const tables = await prisma.tableDefinition.findMany();
  res.status(200).json({ tables });
}
