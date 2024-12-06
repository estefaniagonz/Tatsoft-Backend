import { DevolucionRepository } from "../repositories/DevolucionesRepository";
import { Devolucion } from "../models/index";

const repository = new DevolucionRepository();

export async function obtenerDetalles(id_devolucion: number): Promise<Devolucion[] | null> {
    const devolucion = await repository.buscarId(id_devolucion);
    if (!devolucion) {
        return null; 
    }
    const detallesDevolucion = await repository.detalleDevolucion(id_devolucion);
    return detallesDevolucion.length === 0 ? [] : detallesDevolucion;
}

