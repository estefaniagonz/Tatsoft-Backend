import express from "express"
import { DevolucionController } from "../controllers/DevolucionesControllers"

const router = express.Router();
const devolucionController = new DevolucionController

router.get('/', (req, res) => {
  devolucionController.obtenerDevoluciones(req, res);
});

export default router