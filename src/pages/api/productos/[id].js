
import { pool } from 'config/db';

async function EditAndDelete(req, res) {

    switch (req.method) {
        case "GET":

            const { id } = req.query
            const [info] = await pool.query("SELECT * FROM productos WHERE id = ?", [id])
            return res.status(200).json(info[0])


        case "PUT":
            return await Update(req, res)


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
        const { nombre, img, descripcion, precio } = req.body
        await pool.query("UPDATE productos SET img = ?, nombre = ?, descripcion = ?, precio = ? WHERE id = ?", [img, nombre, descripcion, precio, id])
        return res.status(204).json()
    }

}



export default EditAndDelete