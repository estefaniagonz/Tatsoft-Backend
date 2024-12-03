import { RowDataPacket } from 'mysql2';

export interface Devolucion extends RowDataPacket {
    id_devolucion: number;
    despachos_id_despacho: number;
    fecha_devolucion: Date;
    motivo: string;
    total: number;
    estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA' | 'EN PROCESO';
}
