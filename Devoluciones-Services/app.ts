import express from 'express';
import dotenv from 'dotenv';

// Importación rutas devoluciones
import obtenerTodasDevolucionesRoutes from './routes/ObtenerTodasRoutes';
import obtenerIdRoutes from './routes/ObtenerIdRoutes';
import obtenerFechaRoutes from './routes/obtenerFechaRoutes';
import obtenerMontoRoutes from './routes/obtenerMontoRoutes';
import obtenerDetallesRoutes from './routes/obtenerDetallesRoutes';
import obtenerEstado from './routes/obtenerEstadoRoutes'

const app = express();
app.use(express.json());

app.use('/devoluciones', obtenerTodasDevolucionesRoutes);
app.use('/devolucion', obtenerIdRoutes);
app.use('/devolucion', obtenerFechaRoutes, obtenerMontoRoutes, obtenerEstado);
app.use('/devolucion/detalles', obtenerDetallesRoutes);

// falta flitro por colaborador 

// configuración del puerto 
dotenv.config();
const port = process.env.PORT || 10101;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
