import { DevolucionRepository } from "repositories/DevolucionesRepository";
import { Devolucion } from "models/index";

const repository = new DevolucionRepository();

export async function crearDevolucion(devolucion: Devolucion) {
    return repository.crearDevolucion(devolucion);
}