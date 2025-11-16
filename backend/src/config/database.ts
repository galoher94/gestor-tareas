/**
 * Configuración de la Base de Datos con Prisma
 * Proporciona una instancia única del cliente Prisma para toda la aplicación
 */

import { PrismaClient } from '@prisma/client';

// Crear instancia única de Prisma Client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Manejo de desconexión al cerrar la aplicación
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;