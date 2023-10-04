import axios from "axios";
import Container from "components/Container"
import CardProduct from "components/CardProduct";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Carrito from "components/carrito";

const Home = () => {

  const router = useRouter()

  let [wordUser, setWordUser] = useState("")
  let [auth, setAuth] = useState(null)
  let [result, setResult] = useState([])
  let [logOut, setLogOut] = useState(false)

  let [arrayCarrito, setArrayCarrito] = useState([])
  let [infoCarrito, setInfoCarrito] = useState([])


  useEffect(() => {

    const algo = result.filter((element) => element.nombre.toUpperCase() == wordUser.toUpperCase())

    if (algo.length != 0 && wordUser != "") {
      let [inf] = algo
      setResult([{ ...inf }])

    } else {
      setResult(result)
    }

  }, [wordUser])

  useEffect(() => {


    setAuth(localStorage.getItem("auth"))

    if (localStorage.getItem("nombreUsuario")) {
      async function getLista() {
        const { data } = await axios.post("http://localhost:3000/api/crud", { nombreUsuario: localStorage.getItem("nombreUsuario") });

        setResult(data)


      };
      getLista()
    }


  }, [])

  // useEffect(() => {
  //   console.log("ss");
  //   document.getElementById("logOut").onclick = () => {
  //     localStorage.removeItem("auth")
  //   }
  // })


  const clickCa = (id) => {
    setArrayCarrito([...arrayCarrito, id])
    localStorage.setItem("arCar", [...arrayCarrito, id].toString())


    if (localStorage.getItem("arCar") && localStorage.getItem("arCar").toString().includes(',')) {
      setArrayCarrito(localStorage.getItem("arCar").toString().split(','))
    }
   
    async function getListaCarrito() {
      const { data } = await axios.put("http://localhost:3000/api/crud", { nombreUsuario: localStorage.getItem("nombreUsuario"), datosC: localStorage.getItem("arCar") ? localStorage.getItem("arCar"): "0" });

      setInfoCarrito(data)


    };


getListaCarrito()


  }

  
  const cff = () => {
   
    console.log(localStorage.getItem("arCar").split(","));
  }

  useEffect(()=> {
    if (localStorage.getItem("arCar") && localStorage.getItem("arCar").toString().includes(',')) {
      setArrayCarrito(localStorage.getItem("arCar").toString().split(','))
    }
   
    async function getListaCarrito() {
      const { data } = await axios.put("http://localhost:3000/api/crud", { nombreUsuario: localStorage.getItem("nombreUsuario"), datosC: localStorage.getItem("arCar") ? localStorage.getItem("arCar"): "0" });

      setInfoCarrito(data)


    };

  getListaCarrito()
  },[])


  function borrarElem (id) {
    if (localStorage.getItem("arCar").toString().includes(',')) {
     let p = localStorage.getItem("arCar").toString().split(',')
     let d = p.filter(x => x == id)
     console.log(d);
    }else {

    }


   


  }

  




  return <>
    {auth ?
      <Container>


        <div className="w-100 bg-dark px-4 py-2 bg-opacity-50 d-flex justify-content-between ">
          <i className="bi bi-person-circle fs-1" />
          <h1 className="text-center  ">Lista de Productos</h1>
          <Link href="/RolAdmin/NuevoProducto"><i className="bi bi-plus-circle-fill fs-1 text-dark" /></Link>
        </div>

        <div className="w-100 p-2 d-flex justify-content-between flex-wrap align-items-center">
          <a href="#" className="btn btn-secondary">📔 Mis Clientes</a>
          <a href="#" className="btn btn-secondary">📦 Mis Pedidos</a>
          <a href="#" className="btn btn-secondary">〽 Estadisticas</a>
          <a href="#" className="btn btn-secondary">🛒 Carrito</a>
          <a href="#" className="btn btn-secondary">⁉ PQR</a>
          <i id="logOut" className="bi bi-box-arrow-left fs-1"></i>

        </div>

        <div className="w-10 px-4 py-3">
          <input list="productosList" type="search" onChange={(e) => setWordUser(e.target.value)} className="form-control" />
        </div>

        <div className="mw-100 min-vh-100 d-flex flex-wrap justify-content-center">

          {result.map((z) =>
            <CardProduct key={z.id} clickCarrito={() => {clickCa(z.id)}} result={z} cantidad={false}/>
          )
          }


        </div>
        <Carrito>
          <h1>----------------🛒 Carrito de Compra 🛒-----------------</h1>
          {infoCarrito.map((x) => 
          <CardProduct key={x.id} clickCarrito={() => {console.log('sdd');}} result={x} borrar={() => borrarElem(x.id)} cantidad={true} /> 
          )
          }
        </Carrito>

      </Container>
      : <div>Error, No puedes acceder a este apartado ya que no haz iniciado sesión</div>}
  </>




}



export default Home