import { pool } from "config/db"


async function CrudProductos(req, res) {

    function select(nombreUsuario) {
        return `SELECT * FROM listaproductos${nombreUsuario};`
    }

    switch (req.method) {
        case "GET":
           // let query = `SELECT * FROM listaproductos${nombreUsuario} where`

            // console.log(req.body);
            // return res.status(200)

         //   const [datos] = await pool.query(query)

        case "POST":
            const [info] = await pool.query(select(req.body.nombreUsuario))
            return res.status(200).json(info)
         

        case "PUT":

        let query = `SELECT * FROM listaproductos${req.body.nombreUsuario} where id = 0 `
       var  aa = ''
        for (const iterator of req.body.datosC.toString().split(',')) {

            var aa = `${aa} or id = ${iterator} `

    
        }

        const [dat] = await pool.query(query + aa + ';')

            return res.status(200).json(dat)

    }

    async function Update(req, res) {
        const { id } = req.query
        const { nombre, img, descripcion, precio } = req.body
        await pool.query("UPDATE productos SET img = ?, nombre = ?, descripcion = ?, precio = ? WHERE id = ?", [img, nombre, descripcion, precio, id])
        return res.status(204).json()
    }
}

export default CrudProductos