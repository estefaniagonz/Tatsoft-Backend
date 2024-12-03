import express, { Request, Response } from "express";
import { DevolucionController } from "../controllers/DevolucionesControllers";
import validatorMonto from "../middleware/validatorMonto";

const router = express.Router();
const devolucionController = new DevolucionController();

router.get(
  "/filtro/monto",
  validatorMonto.validatorMonto,
  validatorMonto.validarMonto,
  async (req: Request, res: Response)=> devolucionController.buscarMonto (req, res)
);

export default router;
