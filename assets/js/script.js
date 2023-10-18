
const contenedor = document.querySelector(".container"),
loginHeader = document.querySelector(".container-login header")
registroHeader = document.querySelector(".container-registro header")

registroHeader.addEventListener('click', ()=>{
    contenedor.classList.add('active')
})
loginHeader.addEventListener('click', ()=>{
    contenedor.classList.remove('active')
})
const container = document.getElementById('container')
const opciones = document.getElementById('main-menu')
const usuariosRegistrados = JSON.parse(localStorage.getItem('usuario')) || [];

function iniciarSesion() {
    container.style.display = 'none'
    opciones.style.display = 'block'
}

function cerrarSesion() {
    container.style.display = 'block'
    opciones.style.display = 'none'
}
function limpiarLogin() {
    document.getElementById('email-login').value = ''
    document.getElementById('pass-login').value = ''
}
function limpiarRegistro() {
    document.getElementById('name-user').value = ''
    document.getElementById('email-registro').value = ''
    document.getElementById('pass-registro').value = ''
}

document.getElementById('registro').addEventListener('submit', function registroUsuario() {
    const nombreUsuario = document.getElementById('name-user').value
    const correoRegistro = document.getElementById('email-registro').value
    const passRegistro = document.getElementById('pass-registro').value


    if (correoRegistro && passRegistro) {
        const usuarioExistente = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoRegistro)
        if (usuarioExistente) {
            alert('Correo electronico ya registrado')
            limpiarRegistro()
        } else {
            usuariosRegistrados.push({ correoRegistro, passRegistro})
            localStorage.setItem('usuario', JSON.stringify(usuariosRegistrados))
            alert('Bienvenido ' + nombreUsuario + ' inicia sesion para acceder a tu cuenta')
        }
        limpiarRegistro()
    }
})

document.getElementById('login').addEventListener('submit', function loginUsuario() {
    const correoUsuario = document.getElementById('email-login').value
    const passUsuario = document.getElementById('pass-login').value

    if (correoUsuario && passUsuario) {
        const usuario = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoUsuario && usuario.passRegistro === passUsuario)
        if (usuario) {
            iniciarSesion()
            limpiarLogin()

        } else {
            alert("Credenciales incorrectas. Por favor, inténtelo de nuevo.")
            limpiarLogin()
        }
    } else {
        alert("Por favor, complete todos los campos.")
    }
})
document.getElementById('logout').addEventListener('click', function () {
    cerrarSesion();
})
