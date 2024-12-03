import { VentasRepository } from "../repositories/VentaRepository";
import { Venta } from "../models";

const repository = new VentasRepository();

export async function obtenerPorMonto(montoMin: number, montoMax: number): Promise<Venta[]> {
  return repository.buscarPorMonto(montoMin, montoMax);
}
