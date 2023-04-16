import axios from "axios";
import Container from "components/Container"
import Link from "next/link";

const Home = ({ producto }) => {

  return (
    <>
      <Container>
        <div className="w-100 bg-danger px-4 py-2 bg-opacity-75 d-flex justify-content-between ">
        <i class="bi bi-person-circle fs-1"/>
        <h1 className="text-center  ">Lista de Productos</h1>
          <Link href="/nuevoProducto"><i class="bi bi-plus-circle-fill fs-1"/></Link>
        </div>
        
        <div className="mw-100 min-vh-100 d-flex flex-wrap justify-content-center">
        {producto.map((x) => 
          <div className="card bg-dark bg-opacity-10 m-3" style={{maxWidth: "300px", maxHeight:"550px"}} key={x.id}>
            <Link className="w-100 text-center h-50"  href={`/productsPages/${x.id}`}><img src={x.img} style={{objectFit: "cover"}} alt="imagen del producto" className="card-img-top rounded h-100"/></Link>
            <div className="card-body">
            <p className="text-center h3">{x.nombre}</p>
            <p  style={{textAlign:"justify"}} className="card-text" >{x.descripcion}</p>
            <p className="btn btn-success d-block">${x.precio}</p>
            </div>
          </div>
        )}
        </div>
    
      </Container>
    </>
  )
}

export const getServerSideProps = async () => {

  const info = await axios.get("http://localhost:3000/api/productos")


  return { props: { producto: info.data } }
}


export default Home