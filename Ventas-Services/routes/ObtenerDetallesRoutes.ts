import express, { Request, Response } from "express";
import validatorDetalle from '../middleware/validatorDetalles'
import { VentasController } from "../controllers/ventascontrollers";

const router = express.Router();
const ventasController = new VentasController();

router.get("/detalles/:id_venta",
    validatorDetalle.validatorDetalles,
    validatorDetalle.validarDetalle,
    async (req: Request, res: Response) => ventasController.obtenerDetalles(req, res)
);
    
export default router
