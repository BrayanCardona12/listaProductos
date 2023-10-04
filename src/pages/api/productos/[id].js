import { pool } from 'config/db';

async function EditAndDelete(req, res) {
    function updatee(nombre, img, descripcion, precio, tabla, id) {
        return `UPDATE listaproductos${tabla} SET img = '${img}', nombre = '${nombre}', descripcion = '${descripcion}', precio = ${precio} WHERE id = ${id} ;`
    }

    function select(nombreUsuario, id) {
        return `SELECT * FROM listaproductos${nombreUsuario} WHERE id = ${id} ;`
    }



    switch (req.method) {
        case "GET":

          
        case "POST":
            const { id } = req.query
            const [info] = await pool.query(select(req.body.tabla, id))
            return res.status(200).json(info[0])

        case "PUT":
           
            await Update(req, res)
           
            return res.status(200)

        case "DELETE":
            return await Delete(req, res)

    }

    

    async function Delete(req, res) {
        const { id } = req.query
        await pool.query("DELETE FROM productos WHERE id = ?", [id])
        return res.status(204).json()
    }

    async function Update(req, res) {
        const { id } = req.query
        const { nombre, img, descripcion, precio, tabla } = req.body
        await pool.query(updatee(nombre, img, descripcion, precio, tabla, id))
    }

}



export default EditAndDelete