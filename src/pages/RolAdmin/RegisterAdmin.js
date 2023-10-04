import axios from 'axios'
import Container from 'components/Container'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function RegisterAdmin() {

    let [campos, setCampos] = useState({
        nombre: "",
        pass: "",
        tipo: "usuario"

    })

    let [msgError, setMsgError] = useState("")


    const router = useRouter()
    async function Submit(e) {
        e.preventDefault()
        const { data } = await axios.get("http://localhost:3000/api/auth/" + campos.nombre)

        if (data == '') {
            await axios.post("http://localhost:3000/api/auth/register", campos)
            
            router.push("/RolAdmin")
           
        } else {
            setMsgError("El Usuario ya Existe !!")
            
        }

    }

    const Change = ({ target: { name, value } }) => {
        setCampos({ ...campos, [name]: value })
    }

    return (
        <Container>
            <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">

                <form onSubmit={Submit} className="w-50 border rounded p-5 bg-dark bg-opacity-10" method="POST">
                    <h1 className='text-center'>Registro Usuario / Vendedor</h1>

                    <label onClick={Submit} className='form-label' htmlFor="nombre">Nombre :</label>
                    <input onChange={Change} className='form-control' type="text" name="nombre" id="nombre" />


                    <label className='form-label' htmlFor="pass">Contraseña:</label>
                    <input onChange={Change} className='form-control' id='pass' type="password" name="pass" />


                    <label className='form-label' htmlFor="tipo">Tipo:</label>
                    <select onChange={Change} name="tipo" className='form-control' id="tipo">
                        <option value="usuario">Usuario</option>
                        <option value="vendedor">Vendedor</option>


                    </select>

                    <button className="btn btn-success  my-2 mx-auto d-block w-25">💾 Registrar</button>
                    <b className='text-danger'>{msgError}</b>
                </form>
            </div>
        </Container>
    )
}

export default RegisterAdmin