import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";

// ✅ Corregido: params ahora es una promesa en Next.js 15
interface PageProps {
  params: Promise<{ id: string }>;
}

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) notFound();
  return product;
}

export default async function EditProductPage({ params }: PageProps) {
  // ✅ Await params antes de usar
  const { id } = await params;
  const product = await getProductById(Number(id));

  return (
    <>
      <Heading>Editar Producto {product.name}</Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}