import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { StylesHome } from "public/scripts/StylesHome";
import { useEffect, useState } from "react";

const Home = () => {

  const router = useRouter()
  const [campo, setCampo] = useState({
    nombre: "",
    pass: "",
    tipo: "usuario"
  })

  const [textError, setTextError] = useState("")

  function change({ target: { name, value } }) {

    setCampo({ ...campo, [name]: value })

  }

  async function enviar(e) {
    e.preventDefault()
    let {data} = await axios.post("http://localhost:3000/api/auth/f", campo)
    if (data == '') {
      setTextError("Errorrrr")
    } else {
      localStorage.setItem("auth", "true")
      localStorage.setItem("nombreUsuario", campo.nombre.toString())
      router.push("/RolAdmin")
    }
  }

  useEffect(() => {
    let closer = document.querySelector('#closer');

    closer.onclick = () => {
      closer.style.display = 'none';
      navbar.classList.remove('active');
      cart.classList.remove('active');
      loginForm.classList.remove('active');
    }


    let navbar = document.querySelector('.navbar');

    document.querySelector('#menu-btn').onclick = () => {
      closer.style.display = 'block';
      navbar.classList.toggle('active');
    }

    let cart = document.querySelector('.shopping-cart');

    document.querySelector('#cart-btn').onclick = () => {
      closer.style.display = 'block';
      cart.classList.toggle('active');
    }

    let loginForm = document.querySelector('.login-form');

    document.querySelector('#login-btn').onclick = () => {
      closer.style.display = 'block';
      loginForm.classList.toggle('active');
    }

    let searchForm = document.querySelector('.header .search-form');

    document.querySelector('#search-btn').onclick = () => {
      searchForm.classList.toggle('active');
    }

    window.onscroll = () => {
      searchForm.classList.remove('active');
    }

    let slides = document.querySelectorAll('.home .slides-container .slide');
    let index = 0;

    function next() {
      slides[index].classList.remove('actives');
      index = (index + 1) % slides.length;
      slides[index].classList.add('actives');
    }

    function prev() {
      slides[index].classList.remove('actives');
      index = (index - 1 + slides.length) % slides.length;
      slides[index].classList.add('actives');
    }

    document.getElementById("slide-next").addEventListener("click", next);
    document.getElementById("slide-prev").addEventListener("click", prev);

  }, []);

  return <>
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link hrefLang="https://fonts.googleapis.com" />
      <link hrefLang="https://fonts.gstatic.com" crossorigin />
      <link hrefLang="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
      <link rel="stylesheet" hrefLang="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css/"
      />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    </Head>

    <div>
      <style jsx>
        {`${StylesHome()}`}
      </style>



      <header className="header">
        <a href="/" className="logo"> <i className="fa-solid fa-store"></i> Yanbal</a>

        <form action="" className="search-form form">
          <input className="input" type="search" placeholder="Buscar aqui..." id="search-box" />
          <label htmlFor="search-box" className="fas fa-search label"></label>
        </form>

        <div className="icons">
          <div id="menu-btn" className="fas fa-bars"></div>
          <div id="search-btn" className="fas fa-search"></div>
          <div id="cart-btn" className="fas fa-shopping-cart"></div>
          <div id="login-btn" className="fas fa-user"></div>
        </div>
      </header>



      <div id="closer" className="fas fa-times"></div>


      <nav className="navbar">
        <a href="index.html">Home</a>
        <a href="shop.html">Shop</a>
        <a href="about.html">Nosotros</a>
        <a href="team.html">Equipo</a>
        <a href="blog.html">Blog</a>
        <a href="contact.html">Contacto</a>
      </nav>


      <div className="shopping-cart">

        <div className="box">
          <i className="fas fa-times"></i>
          <img src="https://img.freepik.com/free-photo/bottle-perfume-with-word-perfume-it_1340-37484.jpg" />
          <div className="content">
            <h3 className="h3">Perfume Roxan</h3>
            <span className="quantify"> 1 </span>
            <span className="multiply"> x </span>
            <span className="price"> $ </span>
          </div>
        </div>

        <div className="box">
          <i className="fas fa-times"></i>
          <img src="https://img.freepik.com/free-photo/bottle-perfume-with-word-perfume-it_1340-37484.jpg" />
          <div className="content">
            <h3 className="h3">Perfume Roxan</h3>
            <span className="quantify"> 1 </span>
            <span className="multiply"> x </span>
            <span className="price"> $ </span>
          </div>
        </div>

        <div className="box">
          <i className="fas fa-times"></i>
          <img src="https://img.freepik.com/free-photo/bottle-perfume-with-word-perfume-it_1340-37484.jpg" />
          <div className="content">
            <h3 className="h3">Perfume Roxan</h3>
            <span className="quantify"> 1 </span>
            <span className="multiply"> x </span>
            <span className="price"> $ </span>
          </div>
        </div>

        <h3 className="total h3">total: <span>$560.00</span></h3>
        <a href="/RolAdmin" className="btn">Comprar</a>
      </div>


      <div className="login-form">
        <form className="form" onSubmit={enviar}>
          <h3 className="h3">Iniciar Sesión</h3>
          <input onChange={change} name="nombre" type="text" placeholder="Ingrese su correo" className="box input" />
          <input onChange={change} name="pass" type="password" placeholder="Ingrese su contraseña" className="box input" />
          <select name="tipo" onChange={change} className='box input' id="tipo">
            <option value="usuario">Usuario</option>
            <option value="vendedor">Vendedor</option>
          </select>
          <b style={{color:"red", fontSize:"15px"}}>{textError}</b>
          <div className="remember">
            <input className="remember-input input" type="checkbox" name="" id="remember-me" />
            
            <label className="label" htmlFor="remember-me">Recordarme</label>
          </div>
          <input type="submit" value="login now" className="btn btn-margin input" />
          <p className="forget">Olvidate la contraseña <a href="#">Click Aqui</a></p>
          <p className="forget">No tienes una cuenta <a href="/RolAdmin/RegisterAdmin">Crear Una</a></p>
        </form>


      </div>



      <section className="home">
        <div className="slides-container">

          <div className="slide actives">
            <div className="contenido">
              <span>New Arrivals</span>
              <h3 className="h3">Flexible chair</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat earum quidem excepturi quae
                maiores quas numquam.
              </p>
              <a href="/RolAdmin" className="btn">Comprar Ahora</a>
            </div>
            <div className="image">
              <img src="https://img.freepik.com/free-photo/bottle-perfume-with-word-perfume-it_1340-37484.jpg" />
            </div>
          </div>

          <div className="slide">
            <div className="contenido">
              <span>New Arrivals</span>
              <h3 className="h3">Flexible chair</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat earum quidem excepturi quae
                maiores quas numquam.
              </p>
              <a href="/RolAdmin" className="btn">Comprar Ahora</a>
            </div>
            <div className="image">
              <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png" />
            </div>
          </div>

          <div className="slide">
            <div className="contenido ">
              <span>New Arrivals</span>
              <h3 className="h3">Flexible chair</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat earum quidem excepturi quae
                maiores quas numquam.
              </p>
              <a href="/RolAdmin" className="btn btn-shopin">Comprar Ahora</a>
            </div>
            <div className="image">
              <img src="https://i.pinimg.com/550x/34/9e/2a/349e2a4d065dcc55a417ac6f0528a5cf.jpg" />
            </div>
          </div>

        </div>

        <div id="slide-next" className="fas fa-angle-right"></div>
        <div id="slide-prev" className="fas fa-angle-left"></div>

      </section>


      <section className="contenedor">
        <h2 className="title">Ofertas</h2>
        <div className="banner-container">
          <div className="banner">
            <img src="https://img.freepik.com/free-photo/bottle-perfume-with-word-perfume-it_1340-37484.jpg" />
            <div className="banner-content">
              <span>oferta limitada</span>
              <h3 className="h3">upto 50% off</h3>
              <a href="/RolAdmin" className="btn">Comprar</a>
            </div>
          </div>

          <div className="banner">
            <img src="https://img.freepik.com/free-photo/bottle-perfume-with-word-perfume-it_1340-37484.jpg" />
            <div className="banner-content">
              <span>oferta limitada</span>
              <h3 className="h3">upto 50% off</h3>
              <a href="/RolAdmin" className="btn">Comprar</a>
            </div>
          </div>

          <div className="banner">
            <img src="https://img.freepik.com/free-photo/bottle-perfume-with-word-perfume-it_1340-37484.jpg" />
            <div className="banner-content">
              <span>oferta limitada</span>
              <h3 className="h3">upto 50% off</h3>
              <a href="/RolAdmin" className="btn">Comprar</a>
            </div>
          </div>
        </div>
      </section>


    </div>


  </>
}

export default Home