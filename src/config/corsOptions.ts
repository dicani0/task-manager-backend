import cors from 'cors';

const allowedOrigins: string[] = ['http://localhost:3000', 'http://localhost:3001'];

export const corsOptions: cors.CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', "PATCH", 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
}