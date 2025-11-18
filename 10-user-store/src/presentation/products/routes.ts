import { Router } from "express";
import { ProductController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductService } from "../services";



export class ProductsRoutes {

    static get routes(): Router {

        const router = Router();
        const productService = new ProductService();
        const controller = new ProductController( productService );

        router.get('/', controller.getProduct );
        router.post('/', [ AuthMiddleware.validateJwt ] , controller.createProduct );

        return router;
    }
  }