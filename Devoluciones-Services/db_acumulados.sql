CREATE DATABASE IF NOT EXISTS acumulados;
USE acumulados;

CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    fecha_entrega DATE NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('PENDIENTE', 'VERIFICADO', 'RECHAZADO') DEFAULT 'PENDIENTE'
);

CREATE TABLE devoluciones (
    id_devolucion INT AUTO_INCREMENT PRIMARY KEY,
    fecha_devolucion DATE NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('PENDIENTE', 'APROBADA', 'RECHAZADA') DEFAULT 'PENDIENTE'
);

CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre_producto VARCHAR(120) NOT NULL,
  precio INT NOT NULL,
  descripcion VARCHAR(255),
  cantidad_ingreso INT NOT NULL,
  inventario INT NOT NULL
);

CREATE VIEW detalle_ventas AS
SELECT v.id_venta,
       v.fecha_entrega,
       v.total,
       v.estado,
       p.id_producto,
       p.nombre_producto,
       p.precio, 
       1 AS cantidad,  
       (p.precio * 1) AS subtotal  
FROM ventas v
JOIN productos p ON p.id_producto = v.id_venta;  

select * from detalle_ventas;

CREATE VIEW detalles_devoluciones AS
SELECT 
    d.id_devolucion,
    d.fecha_devolucion,
    d.motivo,
    d.total AS total_devolucion,
    d.estado AS estado_devolucion,
    p.id_producto,
    p.nombre_producto,
    p.precio,
    p.descripcion
FROM 
    devoluciones d
JOIN 
    productos p ON d.id_producto = p.id_producto;
    



 
    