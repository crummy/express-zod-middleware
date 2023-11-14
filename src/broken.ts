import {createMiddleware, defaultEndpointsFactory} from "express-zod-api";
import {z} from "zod";

function createMiddlewareA<IN extends z.ZodObject<any, z.UnknownKeysParam>, OPT, OUT extends Record<string, any> & { id: string}, SCO extends string>() {
    return createMiddleware<IN, OPT, OUT, SCO>({
        input: z.object({}),
        middleware: async () => {
            return {
                id: "an id",
            }
        },
    })
}

function createMiddlewareB<IN extends z.ZodObject<any, any, any>, OPT, OUT extends Record<string, any>, SCO extends string>() {
    return createMiddleware<IN, {id: string}, OUT, SCO>({
        input: z.object({}),
        middleware: async ({options}) => {
            console.log(`this does not work because options is "any": ${options.id}`)
            return {
                ...options,
                something: "else",
            }
        },
    });
}

const brokenExample = defaultEndpointsFactory
    .addMiddleware(createMiddlewareA())
    .addMiddleware(createMiddlewareB())
