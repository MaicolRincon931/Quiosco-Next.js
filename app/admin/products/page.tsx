import ProductPagination from "@/components/products/ProductPagination";
import ProductSearch from "@/components/products/ProductSearch";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";

import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {

  const skip = (page - 1) * pageSize

  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })
  return products
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {

  const page = await +searchParams.page || 1
  const pageSize = 15

  if (page < 1) {
    redirect('/admin/products')
  }

  const productsData = getProducts(page, pageSize)
  const countData = productCount()
  const [products, count] = await Promise.all([productsData, countData])
  const totalPages = Math.ceil(count / pageSize)

  if (page > totalPages) {
    redirect('/admin/products')
  }

  return (
    <>
      <Heading>
        Administrar Productos
      </Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center
        font-bold cursor-pointer">
          Crear Producto
        </Link>

        <ProductSearch />

      </div>

      <ProductTable
        products={products}
      />
      <ProductPagination
        page={page}
        totalPages={totalPages} />
    </>
  )
}
