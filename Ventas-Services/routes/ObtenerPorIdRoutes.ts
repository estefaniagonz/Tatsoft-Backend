import express, { Request, Response } from "express";
import validator from "../middleware/validatorObtenerId"; 
import { VentasController } from "../controllers/ventascontrollers";


const router = express.Router();
const ventasController = new VentasController();

router.get(
  "/:id_venta",
  validator.validatorParams, 
  validator.validator,       
  async (req: Request, res: Response) => ventasController.obtenerPorIdVenta(req, res)
);

export default router;
