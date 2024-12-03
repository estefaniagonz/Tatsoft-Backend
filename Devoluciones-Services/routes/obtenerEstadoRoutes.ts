import express, { Request, Response } from "express";
import { DevolucionController } from "../controllers/DevolucionesControllers";
import validatorEstado from "../middleware/validatorEstado";

const router = express.Router();
const devolucionController = new DevolucionController();

router.get ("/filtro/estado", validatorEstado.validatorEstado,
    validatorEstado.validarEstado,
    async (req: Request, res: Response) => devolucionController.obtenerEstado (req, res)
)

export default router;