import express from "express";
import dotenv from "dotenv";

// importaciones ventas con filtros de busqueda
import obtenerTodasRoutes from "./routes/ObtenerTodasRoutes";
import obtenerPorIdRoutes from "./routes/ObtenerPorIdRoutes";
import obtenerFechaRoutes from "./routes/ObtenerFechaRoutes";
import obtenerMontoRoutes from "./routes/ObtenerMontoRoutes";
import obtenerEstadoRoutes from "./routes/ObtenerEstadoRoutes";
import obtenerDetallesRoutes from "./routes/ObtenerDetallesRoutes";

const app = express();
app.use(express.json());

app.use("/ventas", obtenerTodasRoutes);
app.use("/venta", obtenerPorIdRoutes);
app.use(
  "/venta",
  obtenerFechaRoutes,
  obtenerMontoRoutes,
  obtenerEstadoRoutes,
  obtenerDetallesRoutes
);

// falta el filtro de buscar por nombre de colaborador
dotenv.config();
const port = process.env.PORT || 10101;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;