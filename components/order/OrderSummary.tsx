'use client'

import { useStore } from "@/src/store"
import ProductDetails from "../products/ProductDetails"
import { useMemo } from "react"
import { formatCurrent } from "@/src/utils"
import { createOrder } from "@/actions/create-orden-action"
import { orderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {

  const order = useStore((state) => state.order)
  const clearOrder = useStore((state)=> state.clearOrder)

  const totalPagar = useMemo(() => order.reduce((total, item) =>
    total + (item.quantity * item.price), 0), [order])

  const  handleCreateOrden = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      totalPagar,
      order
    }

    const result = orderSchema.safeParse(data)


    if(!result.success){
      result.error.issues.forEach((issue)=> {
        toast.error(issue.message)
      })
      return
    }
    
    const response = await createOrder(data)
    if(response?.errors){
      response.errors.forEach((issue)=>{
        toast.error(issue.message)
      })
    }
    toast.success('Pedido realizado correctamente')
    clearOrder()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-120 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? <p className="text-center my-10">
        El Pedido esta vacío
      </p> : (
        <div className="mt-5">
          {order.map(item => (
            <ProductDetails
              key={item.id}
              item={item}
            />
          ))}

          <p className="text-2xl text-center mt-20">
            Total a Pagar: {' '}
            <span className="font-bold">
              {formatCurrent(totalPagar)}
            </span>
          </p>

          <form action={handleCreateOrden} className="w-full mt-10 space-y-5">

            <input type="text"
            placeholder="Tu nombre"
   
            className="bg-white border border-gray-100 p-3 w-full"
            name="name" />

            <input type="submit" value='confirmar pedido'
              className="py-2 rounded uppercase text-white bg-black w-full text-center
            cursor-pointer font-bold" />
          </form>

        </div>
      )}

    </aside>
  )
}
