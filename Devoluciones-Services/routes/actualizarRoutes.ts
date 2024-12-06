import express, { Request, Response } from "express";
import { DevolucionController } from "../controllers/DevolucionesControllers";
import validatorActualizar from "../middleware/validatorActualizar";

const router = express.Router();
const devolucionController = new DevolucionController();

router.put(
  "/:id_devolucion", 
  validatorActualizar.validatorActualizar,  
  validatorActualizar.validarActualizar,  
  async (req: Request, res: Response) => devolucionController.actualizarDevolucion(req, res)
);

export default router;