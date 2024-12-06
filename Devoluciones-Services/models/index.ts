import { RowDataPacket } from 'mysql2';

export interface Devolucion extends RowDataPacket {
    id_devolucion: number;
    fecha_devolucion: Date;
    motivo: string;
    total: number;
    valor_devolucion: number;
}

