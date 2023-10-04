import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
<Link />

function CardProduct({ result, clickCarrito, cantidad, borrar = () => {} }) {

    const [display, setDisplay] = useState(true) 

    const router = useRouter()

     function Actulizar(id) {
        router.push(`/productsPages/update/${id}`)
    }

    async function Eliminar(id) {
        await axios.delete(`/api/productos/${id}`)
        router.push("/")
    }

    function changeDisplay() {
        setDisplay(false)
    }

    return (
        <>

            <div className={`${display ? 'd-flex' : 'd-none'} justify-content-center align-items-center flex-row bg-dark bg-opacity-10 m-3 p-2`} style={{ maxWidth: "410px", maxHeight: "360px" }}>
                <Link className="w-50 text-center p-2" style={{ width: "210px", height: "210px" }} href={`/productsPages/${result.id}`}>
                    <img src={result.img} style={{ objectFit: "cover" }} alt="imagen del producto" className="rounded img-fluid w-100 h-100" />
                </Link>
                <div className="w-50">
                    <p className="text-center h3">{result.nombre}</p>
                    <p style={{
                        textAlign: "justify",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        lineClamp: "3",
                        boxOrient: "vertical"
                    }} className="limit" >{result.descripcion}</p>
                    <p className="btn btn-success d-block">${result.precio}</p>
                    <button onClick={() => Actulizar(result.id)} className='btn mx-1 btn-warning'>Actualizar</button>
                    <button onClick={() => Eliminar(result.id)} className='btn mx-1 btn-danger'>Eliminar</button>
                    <button onClick={() => clickCarrito()} className='btn mx-1 btn-success'>+🛒</button>
                    {cantidad && <input className="form-control" min={1} max={10} placeholder="1" type="number"/> }
                    {cantidad && <p onClick={() => {borrar()}} style={{fontSize: '33px', color:'red'}}>X</p> }
                    
                </div>
            </div>
        </>
    )
}

export default CardProduct