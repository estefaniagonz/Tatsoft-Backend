import { VentasRepository } from "../repositories/VentaRepository";
import { Venta } from "../models";

const repository = new VentasRepository();

export async function obtenerPorIdVentas(id_venta: number): Promise<Venta | null> {
  const venta = await repository.buscarPorId(id_venta);
  return venta;
}

