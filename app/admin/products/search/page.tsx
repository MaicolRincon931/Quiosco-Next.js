import ProductSearch from "@/components/products/ProductSearch";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProduct(searchTerm:string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })

    return products
}

export default async function SearchPage({searchParams}: {searchParams: {search: string}}){

    const products = await searchProduct(searchParams.search)

    return(
        <>
            <Heading>Resultados de Búsqueda: {searchParams.search} </Heading>

            <div className="flex flex-col lg:flex-row lg:justify-end">
                <ProductSearch/>
            </div>
            {products.length ? (
                <ProductTable
                products={products}
            />
            ): (
                <p className='text-center text-lg'>No hay Resultados</p>
            )}
            
        </>
    )
}