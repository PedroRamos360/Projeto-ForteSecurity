import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

interface Id {
    id: string
}

export default async function (app: FastifyInstance) {
    app.get('/carts', async (request, reply) => {
        const carts = await prisma.cart.findMany()
        reply.send(carts)
    })

    app.post('/carts', async (request, reply) => {
        const createCartBody = z.object({
            name: z.string()
        })

        const { name } = createCartBody.parse(request.body)

        const cartExists = await prisma.cart.findUnique({
            where: {
                name
            }
        })

        if (cartExists) 
            reply.status(400).send({ error: 'Cart with that name already exists' })

        const cart = await prisma.cart.create({
            data: {
                name,
            }
        })
        reply.status(200).send(cart)

    })

    app.delete('/carts/:id', async (request, reply) => {
        const { id } = request.params as Id

        const cart = await prisma.cart.delete({
            where: {
                id
            }
        })

        reply.status(200).send(cart)
    })
}