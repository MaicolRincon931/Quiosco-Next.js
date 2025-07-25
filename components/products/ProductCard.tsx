'use client'
import { formatCurrent, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
  product: Product
}
export default function ProductCard({ product }: ProductCardProps) {

  const imagePath = getImagePath(product.image)

  return (
    <div className="bg-white flex flex-col items-center">

      <Image
      className="p-0"
        width={300}
        height={400}
        src={imagePath}
        alt={`Imagen Platillo ${product.name}`}
        quality={80}
      />

      <div className="p-5">
        <h3 className="text-2xl font-bold">
          {product.name}
        </h3>
        <p className="mt-5 font-black text-3xl text-amber-500">
          {formatCurrent(product.price)}
        </p>
       <AddProductButton
        product= {product}
       />
      </div>
    </div>
  )
}

