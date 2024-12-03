import express, {Request, Response} from 'express'
import validatorMonto from '../middleware/validatorMonto'
import { VentasController } from "../controllers/ventascontrollers";

const router = express.Router();
const ventasController = new VentasController();

router.get(
    "/filtro/monto",
    validatorMonto.validatorMonto,
    validatorMonto.validarMonto,
    async (req: Request, res: Response)=> ventasController.obtenerPorMonto(req, res)
);

export default router;