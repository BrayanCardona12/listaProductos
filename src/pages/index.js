import axios from "axios";
import Container from "components/Container"
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = ({ producto }) => {

  let [wordUser, setWordUser] = useState("")
  let [condicion, setCondicion] = useState(false)
  let [result, setResult] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    precio: 0,
    img: ""
  })




  useEffect(() => {
    const algo = producto.filter((element) => element.nombre.toUpperCase() == wordUser.toUpperCase())



    if (algo.length != 0 && wordUser != "") {
      let [inf] = algo
      setResult({ ...result, ...inf })
      setCondicion(condicion = true)
      console.log();

    } else {
      setCondicion(condicion = false)
    }


  }, [wordUser])

  function search({ target }) {
    setWordUser(target.value)
    console.log(wordUser);
  }

  if (condicion) {

    return <>
      <Container>
        <div className="w-100 bg-danger px-4 py-2 bg-opacity-75 d-flex justify-content-between ">
          <i className="bi bi-person-circle fs-1" />
          <h1 className="text-center  ">Lista de Productos</h1>
          <Link href="/nuevoProducto"><i className="bi bi-plus-circle-fill fs-1" /></Link>
        </div>

        <div className="w-10 px-4 py-3">
          <input list="productosList" type="search" onChange={search} className="form-control" />
          <datalist id="productosList">
          {producto.map((x) => 
                <option value={x.nombre}></option>
              )}

          </datalist>
        </div>

        <div className="mw-100 min-vh-100 d-flex flex-wrap justify-content-center">



          <div className="card bg-dark bg-opacity-10 m-3" style={{ maxWidth: "300px", maxHeight: "550px" }}>
            <Link className="w-100 text-center h-50" href={`/productsPages/${result.id}`}><img src={result.img} style={{ objectFit: "cover" }} alt="imagen del producto" className="card-img-top rounded h-100" /></Link>
            <div className="card-body">
              <p className="text-center h3">{result.nombre}</p>
              <p style={{ textAlign: "justify" }} className="card-text" >{result.descripcion}</p>
              <p className="btn btn-success d-block">${result.precio}</p>
            </div>
          </div>

        </div>
      </Container>


    </>
  } else {

    return (
      <>
        <Container>
          <div className="w-100 bg-danger px-4 py-2 bg-opacity-75 d-flex justify-content-between ">
            <i className="bi bi-person-circle fs-1" />
            <h1 className="text-center  ">Lista de Productos</h1>
            <Link href="/nuevoProducto"><i className="bi bi-plus-circle-fill fs-1" /></Link>
          </div>

          <div className="w-10 px-4 py-3">
            <input list="productosList" type="search" onChange={search} className="form-control" />
            <datalist style={{backgroundColor: "black"}} id="productosList">
              {producto.map((x) => 
                <option aria-label="550px" value={x.nombre} label={`$${x.precio}`}/>
              )}

            </datalist>
          </div>



          <div className="mw-100 min-vh-100 d-flex flex-wrap justify-content-center">
            {producto.map((x) =>
              <div className="card bg-dark bg-opacity-10 m-3" style={{ maxWidth: "300px", maxHeight: "550px" }} key={x.id}>
                <Link className="w-100 text-center h-50" href={`/productsPages/${x.id}`}><img src={x.img} style={{ objectFit: "cover" }} alt="imagen del producto" className="card-img-top rounded h-100" /></Link>
                <div className="card-body">
                  <p className="text-center h3">{x.nombre}</p>
                  <p style={{ textAlign: "justify" }} className="card-text" >{x.descripcion}</p>
                  <p className="btn btn-success d-block">${x.precio}</p>
                </div>
              </div>
            )}
          </div>

        </Container>
      </>
    )

  }








}

export const getServerSideProps = async () => {

  const info = await axios.get("https://lista-productos.vercel.app/api/productos")


  return { props: { producto: info.data } }
}


export default Home