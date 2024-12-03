import express, { Request, Response } from "express";
import { DevolucionController } from "../controllers/DevolucionesControllers";
import validatorDetalles from "../middleware/validatorDetalles";

const router = express.Router();
const devolucionController = new DevolucionController();

router.get("/:id_devolucion", 
    validatorDetalles.validatorDetalles,
    validatorDetalles.validarDetalle,
    async (req: Request, res: Response) => devolucionController.obtenerDetalle(req, res) 
);

export default router;
