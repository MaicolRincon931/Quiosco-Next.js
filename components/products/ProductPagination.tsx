import Link from "next/link";

type ProductPaginationProps = {
    page: number,
    totalPages: number
}

export default function ProductPagination({ page, totalPages }: ProductPaginationProps) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <nav className="flex justify-center py-10">

            {page > 1 && (
                <Link
                    className="bg-white px-4 py-2 text-lg font-black text-gray-900 ring-1
                ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                    href={`/admin/products?page=${page - 1}`}>
                    &laquo;
                </Link>
            )}

            {pages.map(currentPage => (
                <Link
                key={currentPage}
                    className={`${page === currentPage ? 'bg-amber-600' : 'bg-white'}
                    px-4 py-2 text-lg font-black text-gray-900 ring-1
                    ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    href={`/admin/products?page=${currentPage}`}>
                    {currentPage}
                </Link>
            ))}

            {page < totalPages && (
                <Link
                    className="bg-white px-4 py-2 text-lg font-black text-gray-900 ring-1
                ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                    href={`/admin/products?page=${page + 1}`}>
                    &raquo;
                </Link>
            )}
        </nav>
    )
}
