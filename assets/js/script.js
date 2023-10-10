const contenedor = document.querySelector(".container"),
login = document.querySelector(".container-login header")
registro = document.querySelector(".container-registro header")

registro.addEventListener('click', ()=>{
    contenedor.classList.add('active')
})
login.addEventListener('click', ()=>{
    contenedor.classList.remove('active')
})