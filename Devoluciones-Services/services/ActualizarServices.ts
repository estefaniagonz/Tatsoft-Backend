import { DevolucionRepository } from "repositories/DevolucionesRepository";
import { Devolucion } from "models/index";

const repository = new DevolucionRepository();

export async function actualizarDevolucion(devolucion: Devolucion) {
    return repository.actualizarDevolucion(devolucion.id_devolucion, devolucion);
}