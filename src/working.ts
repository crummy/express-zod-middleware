import {
    createMiddleware,
    defaultEndpointsFactory,
} from "express-zod-api";
import {z} from "zod";


const workingExample = defaultEndpointsFactory.addMiddleware(createMiddleware({
    input: z.object({}),
    middleware: async () => {
        return {
            id: "an id",
        }
    }
})).addMiddleware(createMiddleware({
    input: z.object({}),
    middleware: async ({options}) => {
        console.log(`this is typed as a string: ${options.id}`)
        return {
            ...options,
            something: "else",
        }
    },
}))
