-- Crear la tabla Horario
CREATE TABLE Horario (
    HorarioID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    Fecha DATE,
    HoraInicio TIME,
    HoraFin TIME
);
-- Insertar datos en la tabla Horario
INSERT INTO Horario (Fecha, HoraInicio, HoraFin)
VALUES ('2023-11-13', '09:00:00', '11:00:00');
-- Crear la tabla Pelicula
CREATE TABLE Pelicula (
    PeliculaID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    DuracionMinutos INT,
    Sinopsis NVARCHAR(255),
    Titulo NVARCHAR(75),
    Genero NVARCHAR(15),
    Clasificacion VARCHAR(5),
    Tipo VARCHAR(10)
);
-- Insertar datos en la tabla Pelicula
INSERT INTO Pelicula (
        DuracionMinutos,
        Sinopsis,
        Titulo,
        Genero,
        Clasificacion,
        Tipo
    )
VALUES (
        90,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fringilla ac leo sed facilisis. Morbi suscipit non lacus vitae imperdiet.',
        'Alicia en el País de las Maravillas',
        'Fantasía',
        'TP',
        '3D'
    );
-- Crear la tabla Sala
CREATE TABLE Sala (
    SalaID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    NumeroSala INT,
    CapacidadAsientos INT
);
-- Crear la tabla Asiento
CREATE TABLE Asiento (
    AsientoID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    SalaID INT FOREIGN KEY REFERENCES Sala(SalaID),
    NumeroAsiento INT,
    Estado BIT
);
-- Crear el procedimiento almacenado para generar asientos
CREATE PROCEDURE GenerarAsientos @SalaID INT,
@NumeroAsientos INT AS BEGIN
DECLARE @NumeroAsiento INT = 1
WHILE @NumeroAsiento <= @NumeroAsientos BEGIN
INSERT INTO Asiento (SalaID, NumeroAsiento, Estado)
VALUES (@SalaID, @NumeroAsiento, 0)
SET @NumeroAsiento = @NumeroAsiento + 1
END

-- Crear el procedimiento almacenado para agregar asientos faltantes
CREATE PROCEDURE AgregarAsientosFaltantes @SalaID INT,
@CapacidadNueva INT AS BEGIN
DECLARE @AsientoID INT = 1;
WHILE @AsientoID <= @CapacidadNueva BEGIN IF NOT EXISTS (
    SELECT 1
    FROM Asiento
    WHERE SalaID = @SalaID
        AND NumeroAsiento = @AsientoID
) BEGIN
INSERT INTO Asiento (SalaID, NumeroAsiento, Estado)
VALUES (@SalaID, @AsientoID, 0);
END
SET @AsientoID = @AsientoID + 1;
END;
END;
-- Crear la tabla Cartelera
CREATE TABLE Cartelera (
    CarteleraID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    Descripcion NVARCHAR(255),
    PeliculaID INT FOREIGN KEY REFERENCES Pelicula(PeliculaID),
    HorarioID INT FOREIGN KEY REFERENCES Horario(HorarioID),
    SalaID INT FOREIGN KEY REFERENCES Sala(SalaID)
);
-- Insertar datos en la tabla Cartelera
INSERT INTO Cartelera (Descripcion, PeliculaID, HorarioID, SalaID)
VALUES ('Descripcion de la Cartelera', 1, 1, 3);
-- Consulta de Cartelera
SELECT C.CarteleraID,
    P.Titulo AS TituloPelicula,
    H.Fecha,
    H.HoraInicio,
    H.HoraFin,
    S.NumeroSala
FROM Cartelera C
    JOIN Pelicula P ON C.PeliculaID = P.PeliculaID
    JOIN Horario H ON C.HorarioID = H.HorarioID
    JOIN Sala S ON C.SalaID = S.SalaID;
-- Crear la tabla AsientoCartelera
CREATE TABLE AsientoCartelera (
    AsientoCarteleraID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    CarteleraID INT FOREIGN KEY REFERENCES Cartelera(CarteleraID),
    AsientoID INT FOREIGN KEY REFERENCES Asiento(AsientoID),
    UNIQUE (CarteleraID, AsientoID) -- Para asegurar que un asiento solo esté asociado a una cartelera
);
-- Consultar AsientoCartelera
SELECT COUNT(*)
FROM AsientoCartelera AC
    JOIN Cartelera C ON AC.CarteleraID = C.CarteleraID
    JOIN Asiento A ON AC.AsientoID = A.AsientoID
WHERE C.CarteleraID = @CarteleraID
    AND A.NumeroAsiento = @NumeroAsiento;
-- Crear la tabla Cliente
CREATE TABLE Cliente (
    ClienteID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    Nombre NVARCHAR(50),
    Contacto INT,
    Direccion NVARCHAR(255),
    Cedula NVARCHAR(50)
);
-- Insertar datos en la tabla Cliente
INSERT INTO Cliente (Nombre, Contacto, Direccion, Cedula)
VALUES (
        'Eduardo Sanchez',
        88457475,
        'Los semáforos del Rigero, 2c arriba',
        '001-140703-1023U'
    );
-- Actualizar datos en la tabla Cliente
UPDATE Cliente
SET Nombre = 'Manuel Sanchez',
    Contacto = 88457476,
    Direccion = 'Los semáforos del Rigero, 3c arriba',
    Cedula = '001-140703-1005X'
WHERE ClienteID = 4;
-- Crear la tabla Usuario
CREATE TABLE Usuario (
    UsuarioID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    Nombre NVARCHAR(50),
    PassUsuario NVARCHAR(255),
    rolUsuario NVARCHAR(50)
);
-- Crear la tabla Tipo_Cliente
CREATE TABLE Tipo_Cliente (
    TipoClienteID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    NombreTipo NVARCHAR(50)
);
-- Insertar datos en la tabla Tipo_Cliente
INSERT INTO Tipo_Cliente(NombreTipo)
VALUES ('Adulto'),
    ('Niño'),
    ('Estudiante'),
    ('Adulto Mayor');
-- Crear la tabla Boleto
CREATE TABLE Boleto (
    BoletoID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    TipoClienteID INT FOREIGN KEY REFERENCES Tipo_Cliente(TipoClienteID),
    CarteleraID INT FOREIGN KEY REFERENCES Cartelera(CarteleraID),
    FacturaID INT FOREIGN KEY REFERENCES Factura(FacturaID),
    NumeroAsiento INT,
    Precio FLOAT
);
-- Crear la tabla PrecioBoleto
CREATE TABLE PrecioBoleto (
    PrecioBoletoID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    TipoClienteID INT FOREIGN KEY REFERENCES Tipo_Cliente(TipoClienteID),
    Tipo VARCHAR(10),
    Precio FLOAT
);
-- Insertar datos en la tabla PrecioBoleto
INSERT INTO PrecioBoleto (TipoClienteID, Tipo, Precio)
VALUES (1, '2D', 20.00),
    (1, '3D', 25.00),
    (2, '2D', 15.00),
    (2, '3D', 20.00),
    (3, '2D', 15.00),
    (3, '3D', 20.00),
    (4, '2D', 10.00),
    (4, '3D', 15.00);
-- Consultar PrecioBoleto
SELECT Precio
FROM PrecioBoleto
WHERE TipoClienteID = 1
    AND Tipo = '3D';
-- Consultar Precio por Tipo de Cliente
SELECT PB.Precio
FROM Tipo_Cliente TC
    JOIN PrecioBoleto PB ON TC.TipoClienteID = PB.TipoClienteID
WHERE TC.NombreTipo = 'Adulto'
    AND PB.Tipo = '2D';
-- Crear la tabla Factura
CREATE TABLE Factura (
    FacturaID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    Fecha DATETIME,
    Total FLOAT,
    UsuarioID INT FOREIGN KEY REFERENCES Usuario(UsuarioID),
    ClienteID INT FOREIGN KEY REFERENCES Cliente(ClienteID)
);
-- Insertar datos en la tabla Factura
INSERT INTO Factura (Fecha, Total, UsuarioID, ClienteID)
VALUES (GETDATE(), 0, 1, 1);