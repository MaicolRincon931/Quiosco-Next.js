import ProductSearch from "@/components/products/ProductSearch";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProduct(searchTerm: string) {
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

// ✅ Corregido: searchParams ahora es una promesa en Next.js 15
export default async function SearchPage({
    searchParams
}: {
    searchParams: Promise<{ search?: string }>
}) {

    // ✅ Await searchParams antes de usar
    const { search } = await searchParams;
    
    // ✅ Validación adicional por si search es undefined
    const searchTerm = search || '';
    const products = await searchProduct(searchTerm);

    return (
        <>
            <Heading>Resultados de Búsqueda: {searchTerm} </Heading>

            <div className="flex flex-col lg:flex-row lg:justify-end">
                <ProductSearch />
            </div>
            {products.length ? (
                <ProductTable
                    products={products}
                />
            ) : (
                <p className='text-center text-lg'>No hay Resultados</p>
            )}
        </>
    )
}