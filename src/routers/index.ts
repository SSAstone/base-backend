import { Request, Response, Application, NextFunction } from 'express'
import user_router from '../api/user/user.router'
import serviceRouter from '../api/services/service.router'

interface RouteInterface {
    path: string
    controller(req: Request, res: Response, next?: NextFunction): any
}

const routes: Array<RouteInterface> = [
    {
        path: '/user',
        controller: user_router
    },
    {
        path: '/',
        controller: (req: Request, res: Response) => {
            res.json({
                message: 'Hello World'
            })
        }
    },
    {
        path: '/service',
        controller: serviceRouter
    }
]

const useRoutes = (app: Application): any => {
    routes.forEach((route: RouteInterface): void => {
        if (route.path === '/') {
            app.get(route.path, route.controller)
        } else {
            app.use(route.path, route.controller)
        }
    })
}


export default useRoutes