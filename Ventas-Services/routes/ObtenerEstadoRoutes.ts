import express, { Request, Response } from "express";
import validatorEstado from "../middleware/validatorEstado";
import { VentasController } from "../controllers/ventascontrollers";


const router = express.Router();
const ventasController = new VentasController();

router.get(
    "/filtro/estado",
    validatorEstado.validatorEstado,
    validatorEstado.validarEstado,
    async(req: Request, res: Response) => ventasController.obtenerPorEstado(req, res)
)

export default router;