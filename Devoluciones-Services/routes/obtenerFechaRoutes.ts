import express, { Request, Response } from "express";
import { DevolucionController } from "../controllers/DevolucionesControllers";
import validatorFecha from "../middleware/validatorFecha";

const router = express.Router();
const devolucionController = new DevolucionController();

router.get(
  "/filtro/fecha",
  validatorFecha.validatorFecha,
  validatorFecha.validarFecha,
  async (req: Request, res: Response) => devolucionController.obtenerFecha (req, res)
);

export default router;
