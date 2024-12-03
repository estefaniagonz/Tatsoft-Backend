class Devoluciones {
    id_devolucion: number;
    fecha_devolucion: Date;
    motivo: string;
    total: number;
    estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';

    constructor(
        id_devolucion: number,
        fecha_devolucion: Date,
        motivo: string,
        total: number,
        estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA'
    ) {
        this.id_devolucion = id_devolucion;
        this.fecha_devolucion = fecha_devolucion;
        this.motivo = motivo;
        this.total = total;
        this.estado = estado;
    }
}

export default Devoluciones;
