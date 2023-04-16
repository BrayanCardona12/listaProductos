
import axios from 'axios';
import Container from 'components/Container';
import BtnFloating from 'components/btnFloating';
import { useRouter } from 'next/router';


function productoInfo({ data }) {

    const router = useRouter()

     function Actulizar(id) {
        router.push(`/productsPages/update/${id}`)
    }

    async function Eliminar(id) {
        await axios.delete(`/api/productos/${id}`)
        router.push("/")
    }


    return (
        <Container>
          <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
          <div className="row w-50 d-flex justify-content-center border border-light bg-dark bg-opacity-10 rounded align-items-center bg-light" >
                <div className='col-sm-12 col-md-6'><img style={{objectFit:"cover"}} src={data.img} alt="imagen del producto" className="img-fluid rounded " /></div>
                <div className='p-3 col-sm-12 col-md-6 col-md text-center'>
                    <p>Nombre: {data.nombre}</p>
                    <p style={{textAlign:"justify"}}>Descripcion: {data.descripcion}</p>
                    <p>Precio: ${data.precio}</p>
                    <div>
                        <button onClick={() => Actulizar(data.id)} className='btn mx-1 btn-warning'>Actualizar</button>
                        <button onClick={() => Eliminar(data.id)} className='btn mx-1 btn-danger'>Eliminar</button>
                    </div>
                </div>
            </div>
          </div>

          <BtnFloating/>
        </Container>
    )
}


export const getServerSideProps = async (ctx) => {
    const { data } = await axios.get(`http://localhost:3000/api/productos/${ctx.query.id}`)

    return {
        props: { data }
    }
}

export default productoInfo