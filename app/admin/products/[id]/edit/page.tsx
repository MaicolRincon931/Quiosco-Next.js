import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";

// 👇 Este tipo es compatible con el App Router
interface PageProps {
  params: { id: string };
}

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) notFound();
  return product;
}

export default async function EditProductPage({ params }: PageProps) {
  const product = await getProductById(Number(params.id));

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
