import express, { Request, Response } from "express";
import { DevolucionController } from "../controllers/DevolucionesControllers";
import validatorCrear from "../middleware/validatorCrear";  

const router = express.Router();
const devolucionController = new DevolucionController();

router.post(
  "/crear", 
  validatorCrear.validatorCrear,  
  validatorCrear.validarCrear,    
  async (req: Request, res: Response) => devolucionController.crearDevolucion(req, res)
);

export default router;