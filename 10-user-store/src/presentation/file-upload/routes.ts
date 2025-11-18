import { Router } from "express";
import { FileUploadController } from "./controller";
import { UploadService } from "../services";



export class FileUploadRoutes {

    static get routes(): Router {

        const router = Router();
        const controller = new FileUploadController(
            new UploadService()
        );

        router.post('/single/:type', controller.uploadFile );
        router.post('/multiple/:type', controller.uploadMultipleFiles );

        return router;
    }
  }