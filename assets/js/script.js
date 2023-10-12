
const contenedor = document.querySelector(".container"),
loginHeader = document.querySelector(".container-login header")
registroHeader = document.querySelector(".container-registro header")

registroHeader.addEventListener('click', ()=>{
    contenedor.classList.add('active')
})
loginHeader.addEventListener('click', ()=>{
    contenedor.classList.remove('active')
})

