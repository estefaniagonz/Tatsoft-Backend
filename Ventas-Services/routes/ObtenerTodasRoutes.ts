import express from "express";
import { VentasController } from "../controllers/ventascontrollers";

const router = express.Router();
const ventasController = new VentasController();

router.get("/", (req, res) => {
    ventasController.obtenerTodasLasVentas(req, res);
  });


export default router;