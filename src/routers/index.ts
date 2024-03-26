import { Request, Response, Application, NextFunction } from 'express'
import user_router from '../api/user/user.router'
import serviceRouter from '../api/service/service.router'
import productRouter from '../api/product/product.router'
import categoryRouter from '../api/category/category.router'
import othersRouter from '../api/others/router'

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
    },
    {
        path: '/product',
        controller: productRouter
    },
    {
        path: '/category',
        controller: categoryRouter
    },
    {
        path: '/others',
        controller: othersRouter
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