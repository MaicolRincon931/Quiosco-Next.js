import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
    order: OrderItem[]
    addToCart: (product: Product) => void
    increaseQuantity : (id: Product['id']) => void
    decreaseQuantity : (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToCart: (product) => {

        //Elimina los datos que no necesitamos 
        const { categoryId, image, ...data } = product

        let order: OrderItem[] = []

        if (get().order.find(item => item.id === product.id)) {
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subTotal: item.price * (item.quantity + 1)
            } : item)
        } else {
            order = [ ...get().order, {
                ...data,
                quantity: 1,
                subTotal: product.price
            }]
        }

        set(() => ({
            order
        }))
    },

    increaseQuantity: (id) =>{
        
        set((state)=> ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subTotal: item.price * (item.quantity + 1)
            }: item)
        }))
    },
    decreaseQuantity : (id) => {
        set((state)=> ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity - 1,
                subTotal: item.price * (item.quantity - 1)
            }: item)
        }))
    },
    
    removeItem: (id) =>{
        set((state)=> ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set((state)=>({
            order:[]
        }))
    }
}))