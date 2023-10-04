export const getNombreUsuario = localStorage.getItem("nombreUsuario")
export const getAuth = localStorage.getItem("auth")

export const setNombreUsuario = (nom) => {
    localStorage.setItem("nombreUsuario", nom.toString())
}
export const setAuth = (a) => { 
    localStorage.setItem("auth", a.toString())
}