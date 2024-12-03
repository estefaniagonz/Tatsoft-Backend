import { VentasRepository } from "../repositories/VentaRepository";
import { Venta } from "../models";

const repository = new VentasRepository();

export async function obtenerVentasPorEstado(estado: string): Promise<Venta[]> {
  return await repository.buscarPorEstado(estado);
}
