import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

const defaultMiddleware = [
    cors({
        origin: ['http://192.168.0.104:3000', 'http://localhost:3000', '*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
    }),
    express.json(),
    express.urlencoded({ extended: true }),
    morgan('dev'),
    cookieParser(),
]

const productionMiddleware: Array<any> = []
const developmentMiddleware: Array<any> = []

function useMiddleware(app: express.Application) {
    let middleware: Array<any>
    if (process.env.NODE_ENV !== 'production') {
        middleware = [...defaultMiddleware, ...developmentMiddleware]
    } else {
        middleware = [...defaultMiddleware, ...productionMiddleware]
    }

    app.use(middleware)
}

export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404);
    const error = new Error(`- Not Found - ${req.originalUrl}`);
    next(error);
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
    });
}

export default useMiddleware