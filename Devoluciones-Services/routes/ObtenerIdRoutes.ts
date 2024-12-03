import express, { Request, Response } from "express"; // Importa Request y Response
import { DevolucionController } from "../controllers/DevolucionesControllers";
import ValidatorId from "../middleware/ValidatorId";

const router = express.Router();
const devolucionController = new DevolucionController();

router.get(
  "/:id_devolucion",
  ValidatorId.validatorId,
  ValidatorId.validarId,
  async (req: Request, res: Response) => devolucionController.ObtenerId(req, res)
);

export default router;
