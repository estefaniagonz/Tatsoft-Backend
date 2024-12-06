import express from "express";
import dotenv from "dotenv";

// Importación rutas devoluciones
import obtenerTodasDevolucionesRoutes from "./routes/ObtenerTodasRoutes";
import obtenerIdRoutes from "./routes/ObtenerIdRoutes";
import obtenerFechaRoutes from "./routes/obtenerFechaRoutes";
import obtenerMontoRoutes from "./routes/obtenerMontoRoutes";
import obtenerDetallesRoutes from "./routes/obtenerDetallesRoutes";
import crearRoutes from "./routes/crearRoutes";
import actualizarRoutes from "./routes/actualizarRoutes";
import borrarRoutes from "./routes/borrarRoutes";

const app = express();
app.use(express.json());

app.use("/devoluciones", obtenerTodasDevolucionesRoutes, crearRoutes);
app.use(
  "/devolucion",
  obtenerIdRoutes,
  borrarRoutes,
  obtenerFechaRoutes,
  obtenerMontoRoutes,
  actualizarRoutes
);
app.use("/devolucion/detalles", obtenerDetallesRoutes);

// falta flitro por colaborador

dotenv.config();
const port = process.env.PORT || 10101;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
