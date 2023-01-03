import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import { z } from 'zod'

import { Product } from "@prisma/client"

interface Id {
    id: string
}

export default async function (app: FastifyInstance) {
    app.post('/products', async (request, reply) => {
        const createProductBody = z.object({
            name: z.string(),
            price: z.number(),
            cartId: z.string()
        })

        const { name, price, cartId } = createProductBody.parse(request.body)

        const product = await prisma.product.create({
            data: {
                name,
                price,
                cartId
            }
        }) as Product

        await prisma.cart.update({
            where: {
                id: cartId
            },
            data: {
                products: {
                    set: product
                }
            }
        })
        reply.status(200).send(product)
    })

    app.get('/products', async (request, reply) => {
        const products = await prisma.product.findMany()
        reply.send(products)
    })

    app.put('/products/:id', async (request, reply) => {
        const { id } = request.params as Id
        const createProductBody = z.object({
            name: z.string(),
            price: z.number(),
            cartId: z.string()
        })

        const { name, price, cartId } = createProductBody.parse(request.body)

        const product = await prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                price
            }
        })

        reply.status(200).send(product)
    })

    app.delete('/products/:id', async (request, reply) => {
        const { id } = request.params as Id
        
        await prisma.product.delete({
            where: {
                id
            }
        })

        reply.status(202)
    })
}