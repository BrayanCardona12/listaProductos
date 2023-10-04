import { pool } from 'config/db'

export default async function datos(req, res) {
    function insert({tabla, img, nombre, descripcion, precio}) {
        return `INSERT INTO listaproductos${tabla} (img, nombre, descripcion, precio) 
        VALUES ('${img}', '${nombre}','${descripcion}',${precio})`
    }


    switch (req.method) {
        case "GET":
            const [result] = await pool.query("SELECT * FROM productos")
            return res.status(200).json(result)


        case "POST":
            const infoReq = req.body
            const [datos] = await pool.query(insert(infoReq))
            return res.status(200).json(datos)
        
      
            
    }

}

