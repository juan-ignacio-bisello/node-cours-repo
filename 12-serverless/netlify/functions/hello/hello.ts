import { Config, Context } from "@netlify/functions";


export default async (  req: Request, contect: Context ) => {
    return new Response( JSON.stringify({
        message: "Hola mundo"
    }),
    {
        status: 200,
        headers: {"Content-Type": "application/json"},
    }
    )
}

export const config: Config = {
    path: "/api/greeting",
}
