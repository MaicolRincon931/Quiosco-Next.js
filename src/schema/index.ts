import {z} from 'zod'


export const orderSchema = z.object({
    name: z.string().min(1, 'Tu Nombre es Obligatorio'),
    totalPagar: z.number().min(1, 'Hay errores en la orden'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subTotal: z.number()
    }))
})

export const SearchSchema = z.object({
    search: z.string().trim().min(1, {message: 'La busqueda no puede ir vacía'})
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image: z.string().min(1, {message: 'La imagen es obligatoria'})
})