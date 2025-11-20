import { Router } from "express";
import { FileUploadController } from "./controller";
import { UploadService } from "../services";
import { UploadMiddleware } from "../middlewares/upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";



export class FileUploadRoutes {

    static get routes(): Router {

        const router = Router();
        const controller = new FileUploadController(
            new UploadService()
        );

        router.use( UploadMiddleware.containFiles );
        router.use( TypeMiddleware.validTypes( ['users', 'products', 'categories'] ) );

        router.post('/single/:type', controller.uploadFile );
        router.post('/multiple/:type', controller.uploadMultipleFiles );

        return router;
    }
  }