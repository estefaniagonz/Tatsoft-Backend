import express, { Request, Response } from "express";
import fechaValidator from "../middleware/validatorFecha";
import { VentasController } from "../controllers/ventascontrollers";

const router = express.Router();
const ventasController = new VentasController();

router.get(
    "/filtro/fecha",
    fechaValidator.validatorFecha,
    fechaValidator.validarFecha,
    async(req: Request, res: Response) => ventasController.obtenerPorFecha(req, res)
  );
  
  export default router;