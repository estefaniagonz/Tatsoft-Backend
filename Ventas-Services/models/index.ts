import { RowDataPacket } from 'mysql2';

export interface Venta extends RowDataPacket {
    id_venta: number;
    despachos_id_despacho: number | null;
    fecha_entrega: Date;
    total: number;
}

