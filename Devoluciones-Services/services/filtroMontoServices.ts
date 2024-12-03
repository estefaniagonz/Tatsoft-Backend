import { DevolucionRepository } from "../repositories/DevolucionesRepository";
import { Devolucion } from "../models/index";

const repository = new DevolucionRepository

export async function buscarMonto(montoMin:number, montoMax: number): Promise<Devolucion[]> {
    return repository.buscarMonto(montoMin, montoMax)
}
