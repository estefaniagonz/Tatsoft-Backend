import { DevolucionRepository } from "repositories/DevolucionesRepository";
import { Devolucion } from "models/index";

const repository = new DevolucionRepository();

export async function borrarDevolucion(devolucion: Devolucion) {
    return repository.borrarDevolucion(devolucion.id_devolucion);
}