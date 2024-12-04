CREATE DATABASE devoluciones_acumulados;
USE devoluciones_acumulados;

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

// inserciones de prueba
INSERT INTO devoluciones (fecha_devolucion, motivo, total, estado)
VALUES 
('2024-11-21', 'Producto defectuoso', 150.00, 'APROBADA'),
('2024-11-22', 'Cliente insatisfecho', 300.00, 'PENDIENTE'),
('2024-11-23', 'Error en la entrega', 200.50, 'RECHAZADA');

  
  
INSERT INTO productos (id_producto, nombre_producto, precio, descripcion, cantidad_ingreso, inventario)
VALUES
(1, 'Producto A', 150, 'Descripción del Producto A', 100, 80),
(2, 'Producto B', 50, 'Descripción del Producto B', 200, 180),
(3, 'Producto C', 75, 'Descripción del Producto C', 150, 120);



UPDATE devoluciones SET id_producto = 1 WHERE id_devolucion = 1;
UPDATE devoluciones SET id_producto = 2 WHERE id_devolucion = 2;
UPDATE devoluciones SET id_producto = 3 WHERE id_devolucion = 3; 


select * from devoluciones;

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
    
SELECT * FROM detalles_devoluciones;

   SELECT * 
        FROM detalles_devoluciones
        WHERE id_devolucion = 3;
        
        select * from devoluciones;
   
      

 
 

    


