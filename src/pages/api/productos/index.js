import { pool } from 'config/db'

export default async function datos(req, res) {
    switch (req.method) {
        case "GET":
            const [result] = await pool.query("SELECT * FROM productos")
            return res.status(200).json(result)


        case "POST":
            const infoReq = req.body
            const [datos] = await pool.query("INSERT INTO productos SET ?", infoReq)
            return res.status(200).json(datos)
        
        case "PUT":
            
    }

}

