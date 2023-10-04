import axios from 'axios'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BtnFloating from './btnFloating'

function Form() {


    let [producto, setProducto] = useState({
        img: "",
        nombre: "",
        descripcion: "",
        precio: 0,
        tabla: ""

    })

    let [er, setEr] = useState("")


    useEffect(() => {
        if (!localStorage.getItem("auth" ) || !localStorage.getItem("nombreUsuario" )) {
            setEr("Error")
        }

        setProducto({ ...producto, tabla: localStorage.getItem("nombreUsuario")})

        async function getInfo(id) {
            const { data } = await axios.post(`/api/productos/${id}`, {tabla: localStorage.getItem("nombreUsuario")})
            setProducto(data)
        }

        if (router.query.id) {
            getInfo(router.query.id)
        }


    }, [])



    const Change = ({ target: { name, value } }) => {
        setProducto({ ...producto, [name]: value })
    }

    const router = useRouter()

    const Submit = async (e) => {
        e.preventDefault()
        if (router.query.id) {
       
            await axios.put(`/api/productos/${router.query.id}`, {...producto, tabla: localStorage.getItem("nombreUsuario")})
            router.push('/')

        } else {
            
            await axios.post("http://localhost:3000/api/productos", producto)
            router.push('/')
        }

       

    }


    return (
        <>
            <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">



                <form className="w-50 border rounded p-5 bg-dark bg-opacity-10" onSubmit={Submit} method="POST">
                    <h1 className='text-center'>{router.query.id ? "Actualizar" : "Insertar"}</h1>
                    <label className='form-label' htmlFor="price">Img:</label>
                    <input className='form-control' onChange={Change} type="text" value={producto.img} name="img" id="img" />

                    <label className='form-label' htmlFor="text">Nombre:</label>
                    <input className='form-control' type="text" onChange={Change} name="nombre" value={producto.nombre} />



                    <label className='form-label' htmlFor="price">Precio:</label>
                    <input className='form-control' onChange={Change} type="number" value={producto.precio} name="precio" id="precio" />



                    <label className='form-label' htmlFor="descripcion">Descripcion:</label>
                    <textarea className='form-control' value={producto.descripcion} onChange={Change} name="descripcion" rows="2" />

                    <button className="btn btn-success  my-2 mx-auto d-block w-25">Save Product</button>

                <b>{er}</b>
                </form>
            </div>
            <BtnFloating />
        </>
    )
}

export default Form