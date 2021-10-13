DROP DATABASE IF EXISTS dbamarie;
CREATE DATABASE dbamarie;
USE dbamarie;

CREATE TABLE amc_rol(
	rol_id INT AUTO_INCREMENT NOT NULL,
    rol_nombre VARCHAR(100),
    PRIMARY KEY(rol_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE amc_user(
    us_id INT AUTO_INCREMENT NOT NULL,
    us_nombre VARCHAR(100) NOT NULL,
    us_ape VARCHAR(200) NOT NULL,
    us_user VARCHAR(100) NOT NULL,
    us_pass VARCHAR(200) NOT NULL,
    us_email VARCHAR(200) NOT NULL,
    us_tel VARCHAR(20) NOT NULL,
    us_fechaReg DATE NOT NULL,
    us_estado TINYINT NOT NULL,
    PRIMARY KEY (us_id),
	UNIQUE KEY `username_UNIQUE` (us_user),
	UNIQUE KEY `email_UNIQUE` (us_email)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE amc_asigna_rol(
	ar_user INT NOT NULL,
    ar_rol INT NOT NULL,
    PRIMARY KEY(ar_user, ar_rol),
	FOREIGN KEY (ar_user) REFERENCES amc_user(us_id),
	FOREIGN KEY (ar_rol) REFERENCES amc_rol(rol_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE amc_direccion_envio(
	dir_id INT AUTO_INCREMENT NOT NULL,
    dir_detalle1 VARCHAR(500) NOT NULL,
    dir_detalle2 VARCHAR(500),
    dir_detalle3 VARCHAR(500),
    dir_default TINYINT NOT NULL,
    dir_user INT NOT NULL,
    PRIMARY KEY(dir_id),
    FOREIGN KEY (dir_user) REFERENCES amc_user(us_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE amc_tipo_producto(
	tprod_id INT AUTO_INCREMENT NOT NULL,
    tprod_nombre VARCHAR(300) NOT NULL,
    tprod_estado TINYINT NOT NULL,
    PRIMARY KEY(tprod_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE amc_producto(
	prod_id INT AUTO_INCREMENT NOT NULL,
    prod_nombre VARCHAR(100) NOT NULL,
    prod_descripcion VARCHAR(500) NOT NULL,
    prod_estado TINYINT NOT NULL,
    prod_precio DECIMAL NOT NULL,
    PRIMARY KEY(prod_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE amc_asigna_tipo(
	at_producto INT NOT NULL,
    at_tipo INT NOT NULL,
    FOREIGN KEY(at_producto) REFERENCES amc_producto(prod_id),
    FOREIGN KEY(at_tipo) REFERENCES amc_tipo_producto(tprod_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE amc_resenia(
	res_id INT AUTO_INCREMENT NOT NULL,
    res_nombre VARCHAR(70) NOT NULL,
    res_mensaje VARCHAR(300) NOT NULL,
    res_producto INT NOT NULL,
    PRIMARY KEY(res_id),
    FOREIGN KEY(res_producto) REFERENCES amc_producto(prod_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE amc_imagen_prod(
	img_id INT AUTO_INCREMENT NOT NULL,
    img_path VARCHAR(200) NULL,
    img_producto INT NOT NULL,
    PRIMARY KEY (img_id),
    FOREIGN KEY(img_producto) REFERENCES amc_producto(prod_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE amc_tipo_pedido(
	tipoP_id INT AUTO_INCREMENT NOT NULL,
    tipoP_nombre VARCHAR(50) NOT NULL,
    tipoP_costo DOUBLE NULL,
    PRIMARY KEY(tipoP_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE amc_pedido(
	ped_id INT AUTO_INCREMENT NOT NULL,
    ped_fecha DATE NOT NULL,
    ped_total DECIMAL NOT NULL,
    ped_user INT NOT NULL,
    ped_tipo INT NOT NULL,
    ped_estado TINYINT NOT NULL,
    PRIMARY KEY(ped_id),
    FOREIGN KEY(ped_user) REFERENCES amc_user(us_id),
    FOREIGN KEY(ped_tipo) REFERENCES amc_tipo_pedido(tipoP_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE amc_detalle_pedido(
	dp_id INT AUTO_INCREMENT NOT NULL,
    dp_producto INT NOT NULL,
    dp_cantidad INT NOT NULL,
    dp_subtotal DECIMAL NOT NULL,
    dp_pedido INT NOT NULL,
    PRIMARY KEY(dp_id),
    FOREIGN KEY(dp_pedido) REFERENCES amc_pedido(ped_id),
    FOREIGN KEY(dp_producto) REFERENCES amc_producto(prod_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;