import { pool } from 'config/db'

export default async function Register(req, res) {

function crearTablaListadoProductos(nomTabla) {
    return `
    CREATE TABLE listaProductos${nomTabla}(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        img TEXT NOT NULL,
        nombre VARCHAR(200) NOT NULL,
        descripcion VARCHAR(400) NOT NULL,
        precio DECIMAL,
        createAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `
}

    switch (req.method) {
        
        case "GET":
            const [result] = await pool.query("SELECT * FROM vendedores where nombre = ?", req.body.nombre)

            return res.status(200).json(result)


        case "POST":

            const infoReq = req.body

            if (infoReq.tipo == "vendedor") {
                await pool.query("INSERT INTO vendedores SET ?", infoReq)
                await pool.query(crearTablaListadoProductos(infoReq.nombre))

                return res.status(200).json(infoReq)
            } else {
                await pool.query("INSERT INTO usuarios SET ?", infoReq)

                return res.status(200).json(infoReq)
            }




    }
}
