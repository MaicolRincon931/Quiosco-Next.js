import { PrismaClient } from '@prisma/client'
import { products } from './data/products'
import { categories } from './data/categories'

const prisma = new PrismaClient()

async function main() {

  await prisma.category.createMany({
    data:categories
  })

  await prisma.product.createMany({
    data: products,
  })
}

main()
  .then(() => {
    console.log('Seed ejecutado con éxito.')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
