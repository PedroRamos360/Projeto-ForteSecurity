import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import productRoutes from './routes/products'
import cartRoutes from './routes/carts'
import { Secret } from '@fastify/jwt'

require('dotenv').config()

async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true
    })

    await fastify.register(jwt, {
        // secret: process.env.JWT_SECRET as Secret
        secret: "mysecter12345"
    })

    fastify.register(productRoutes)
    fastify.register(cartRoutes)

    await fastify.listen({ port: 3333 })
}

bootstrap()