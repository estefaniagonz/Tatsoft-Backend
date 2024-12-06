import express, { Request, Response } from "express";
import { DevolucionController } from "../controllers/DevolucionesControllers";
import validatorEliminar from "../middleware/validatorEliminar";

const router = express.Router();
const devolucionController = new DevolucionController();

router.delete(
  "/eliminar/:id_devolucion",
  validatorEliminar.validatorEliminar, 
  validatorEliminar.validarEliminar,  
  async (req: Request, res: Response) => devolucionController.EliminarDevolucion(req, res)
);

export default router;
