import {createMiddleware, defaultEndpointsFactory} from "express-zod-api";
import { z } from "zod";

const middlewareA = createMiddleware({
    input: z.object({}),
    middleware: async () => {
        return {
            id: "an id",
        }
    },
})

const middlewareB = createMiddleware({
    input: z.object({}),
    middleware: async ({ options }) => {
        console.log(`this is typed as a string: ${options.id}`)
        return {
            ...options,
            something: "else",
        }
    },
})

const brokenExample = defaultEndpointsFactory
    .addMiddleware(middlewareA)
    .addMiddleware(middlewareB)
