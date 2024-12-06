CREATE DATABASE devoluciones_acumulados;
USE devoluciones_acumulados;

CREATE TABLE devoluciones (
    id_devolucion INT AUTO_INCREMENT PRIMARY KEY,
    fecha_devolucion DATE NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    valor_devolucion DECIMAL (10,2) NOT NULL
);

CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre_producto VARCHAR(120) NOT NULL,
  precio INT NOT NULL,
  descripcion VARCHAR(255),
  cantidad_ingreso INT NOT NULL,
  inventario INT NOT NULL
);


CREATE VIEW detalles_devoluciones AS
SELECT 
    d.id_devolucion,
    d.fecha_devolucion,
    d.motivo,
    d.total AS total_devolucion,
    p.id_producto,
    p.nombre_producto,
    p.precio AS precio_producto,
    p.descripcion,
    p.cantidad_ingreso AS cantidad_ingresada,
    p.inventario AS inventario_actual
FROM 
    devoluciones d
JOIN 
    productos p ON d.id_producto = p.id_producto;


   
      

 
 

    


