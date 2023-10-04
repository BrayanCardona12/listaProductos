const { pool } = require("config/db")

export default async function Exist(req, res) {

    switch (req.method) {

        case "GET":
            const { nom } = req.query
            const [info1] = await pool.query("SELECT * FROM vendedores WHERE nombre = ?", [nom])
            const [info2] = await pool.query("SELECT * FROM usuarios WHERE nombre = ?", [nom])
            
            info1.push(info2);
        
            return res.status(200).json(info1)

            case "POST":
                const infoReq = req.body

                let query1 = `SELECT * from usuarios where nombre =  '${infoReq.nombre}' AND pass = '${infoReq.pass}' AND tipo = '${infoReq.tipo}';`
                let query2 = `SELECT * from vendedores where nombre = '${infoReq.nombre}' AND pass = '${infoReq.pass}' AND tipo = '${infoReq.tipo}';`

                const [datos1] = await pool.query(query1)
                const [datos2] = await pool.query(query2)
                
                datos1.push(datos2);

                return res.status(200).json(datos1)

    }
}

