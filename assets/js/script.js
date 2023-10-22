
//Funcionalidad abrir y cerrar login 
const contenedor = document.querySelector(".container"),
    loginHeader = document.querySelector(".container-login header")
registroHeader = document.querySelector(".container-registro header")

registroHeader.addEventListener('click', () => {
    contenedor.classList.add('active')
})
loginHeader.addEventListener('click', () => {
    contenedor.classList.remove('active')
})

//Variables globales necesarias en el proyecto
let saldo = 100000;
let intentosFallidos = 0;
let correoUsuario = ''
const container = document.getElementById('container')
const opciones = document.getElementById('main-menu')
const checkBalanceBtn = document.getElementById('check-balance')
const withdrawBtn = document.getElementById('withdraw')
const transferBtn = document.getElementById('transfer')
const depositBtn = document.getElementById('deposit')
const showTransactionsBtn = document.getElementById('show-transactions')
const saldoContainer = document.getElementById('saldo-container')
const volverMainMenuBtn = document.getElementById('volver-main-menu')
const retiro = document.getElementById('retiro-real')
const retiroAmountInput = document.getElementById('retiro-amount')
const realizarRetiroBtn = document.getElementById('realizar-retiro')
const cancelarRetiroBtn = document.getElementById('cancelar-retiro')

const transfer = document.getElementById('transfer-div')
const realizarTransferenciaBtn = document.getElementById('realizar-transferencia')
const cancelarTransferenciaBtn = document.getElementById('cancelar-transferencia')
const comprobanteTransferenciaDiv = document.getElementById('comprobante-transferencia')

const destinatarioSpan = document.getElementById('destinatario')
const montoTransferidoSpan = document.getElementById('monto-transferido')
const volverMainMenuComprobanteBtn = document.getElementById('volver-main-menu-comprobante')
const historialContainer = document.getElementById('historial-container')
const volverMenuHistorial = document.getElementById('volver-main-menu-historial')

const consignarDiv = document.getElementById('consignar-div');
const realizarConsignacionBtn = document.getElementById('realizar-consignacion')
const cancelarConsignacionBtn = document.getElementById('cancelar-consignacion')
const montoConsignacionInput = document.getElementById('monto-consignacion')


const historialMovimientos = []
const usuariosRegistrados = JSON.parse(localStorage.getItem('usuario')) || []

const userRegistrationRegex =
{
    username: /^[ A-Za-z]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Z]).{8,}$/
}

//funcion para iniciar sesion
function iniciarSesion() {
    container.style.display = 'none'
    opciones.style.display = 'block'
}

//funcion para cerrar sesion
function cerrarSesion() {
    container.style.display = 'block'
    opciones.style.display = 'none'
}
//funcion para limpiar los input del login
function limpiarLogin() {
    document.getElementById('email-login').value = ''
    document.getElementById('pass-login').value = ''
}
//funcion para limpiar los input del registro
function limpiarRegistro() {
    document.getElementById('name-user').value = ''
    document.getElementById('email-registro').value = ''
    document.getElementById('pass-registro').value = ''
    document.getElementById('pass-confirmacion').value = ''
}

//funcion para crear nuevos usuarios y agregarlos a "Base de datos"
document.getElementById('registro').addEventListener('submit', function registroUsuario() {
    const nombreUsuario = document.getElementById('name-user').value
    const correoRegistro = document.getElementById('email-registro').value
    const passRegistro = document.getElementById('pass-registro').value
    const passConfirmacion = document.getElementById('pass-confirmacion').value

    if (correoRegistro && passRegistro && passConfirmacion) {
        if (!userRegistrationRegex.username.test(nombreUsuario)) {
            alert('El nombre de usuario debe contener solo letras y no debe contener números.');
            return;
        }
        if (!userRegistrationRegex.email.test(correoRegistro)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return
        }
        if (passRegistro.length < 8 || !userRegistrationRegex.password.test(passRegistro)) {
            alert('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula.');
            return
        }
        if (passRegistro !== passConfirmacion) {
            alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.')
        } else {
            const usuarioExistente = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoRegistro)
            if (usuarioExistente) {
                alert('Correo electrónico ya registrado')
                limpiarRegistro()
            } else {
                usuariosRegistrados.push({ correoRegistro, passRegistro, nombreUsuario })
                localStorage.setItem('usuario', JSON.stringify(usuariosRegistrados))
                alert('Bienvenido ' + nombreUsuario + ', inicia sesión para acceder a tu cuenta')
                limpiarRegistro()
            }
        }
    } else {
        alert('Por favor, complete todos los campos.')
    }
    limpiarRegistro()
})

//funcion para inicio de session 
document.getElementById('login').addEventListener('submit', function loginUsuario() {
    correoUsuario = document.getElementById('email-login').value
    const passUsuario = document.getElementById('pass-login').value


    if (correoUsuario && passUsuario) {
        if (!userRegistrationRegex.email.test(correoUsuario)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        if (!userRegistrationRegex.password.test(passUsuario)) {
            alert('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula.');
            return;
        }
        const usuario = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoUsuario && usuario.passRegistro === passUsuario)
        if (usuario) {
            iniciarSesion()
            limpiarLogin()
            correoUsuario = correoUsuario;
        } else {
            intentosFallidos++
            if (intentosFallidos > 3) {
                alert("Has alcanzado el máximo de intentos fallidos. El formulario se bloqueará.");
                document.getElementById('email-login').disabled = true;
                document.getElementById('pass-login').disabled = true;
                document.getElementById('btnIniciar').disabled = true;
            } else {
                alert("Credenciales incorrectas. Intento fallido #" + intentosFallidos);
            }
            limpiarLogin()
        }
    } else {
        alert("Por favor, complete todos los campos.");
    }
})
//Consultar saldo 
function consultarSaldo() {
    container.style.display = 'none'
    opciones.style.display = 'none'
    const saldoActual = saldo

    const usuarioActual = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoUsuario)

    if (usuarioActual) {
        const nombreUsuario = usuarioActual.nombreUsuario;
        document.getElementById('nombre-usuario').textContent = ` ${nombreUsuario}`;
        document.getElementById('saldo-actual').textContent = ` ${saldoActual}`;
    }

    document.getElementById('saldo-container').style.display = 'block'
}
checkBalanceBtn.addEventListener('click', function () {
    consultarSaldo();
    agregarMovimiento("Consulta de saldo: ", saldo)
});

volverMainMenuBtn.addEventListener('click', function () {
    document.getElementById('saldo-container').style.display = 'none'
    container.style.display = 'none'
    opciones.style.display = 'block'
})

//Retirar dinero de la cuenta 
document.getElementById('withdraw').addEventListener('click', function () {
    retiro.style.display = 'block';
    container.style.display = 'none';
    opciones.style.display = 'none';
});
realizarRetiroBtn.addEventListener('click', function () {
    const cantidadRetiro = parseFloat(retiroAmountInput.value);

    if (isNaN(cantidadRetiro) || cantidadRetiro <= 0 || saldo < cantidadRetiro || saldo - cantidadRetiro < 10000) {
        alert("Por favor, ingrese una cantidad válida.");
        return;
    }
    saldo -= cantidadRetiro
    alert("Retiro exitoso. Saldo restante: " + saldo)
    retiro.style.display = 'none'
    container.style.display = 'none'
    opciones.style.display = 'block'

    agregarMovimiento("Retiro", cantidadRetiro);

    retiroAmountInput.value = '';
});

// Evento para cancelar el retiro
cancelarRetiroBtn.addEventListener('click', function () {
    retiro.style.display = 'none'
    container.style.display = 'none'
    opciones.style.display = 'block'
    retiroAmountInput.value = ''
})

transferBtn.addEventListener('click', function () {
    transfer.style.display = 'block'
    comprobanteTransferenciaDiv.style.display = 'none'
    container.style.display = 'none'
    opciones.style.display = 'none'
});

// Evento para realizar la transferencia
realizarTransferenciaBtn.addEventListener('click', function () {
    const destinatario = document.getElementById('destinatario-input').value;
    const montoTransferido = parseFloat(document.getElementById('monto-transferido-input').value)

    if (!usuariosRegistrados.find(usuario => usuario.correoRegistro === destinatario)) {
        alert("El destinatario no está registrado.")
        return
    }

    if (isNaN(montoTransferido) || montoTransferido <= 9999 || saldo < montoTransferido) {
        alert("La transferencia no es válida.")
        return
    }

    saldo -= montoTransferido
    alert("Transferencia exitosa.")
    agregarMovimiento("Transferencia", montoTransferido)

    // Mostrar el comprobante de la transferencia
    destinatarioSpan.textContent = destinatario;
    montoTransferidoSpan.textContent = montoTransferido
    comprobanteTransferenciaDiv.style.display = 'block'
    transfer.style.display = 'none'

    // Restablecer los valores de los campos
    document.getElementById('destinatario-input').value = ''
    document.getElementById('monto-transferido-input').value = ''
});

// Evento para cancelar la transferencia
cancelarTransferenciaBtn.addEventListener('click', function () {
    transfer.style.display = 'none'
    container.style.display = 'none'
    opciones.style.display = 'block'

    document.getElementById('destinatario').value = '';
    document.getElementById('monto-transferido').value = '';
});
// Evento para volver al menú principal desde el comprobante de transferencia
volverMainMenuComprobanteBtn.addEventListener('click', function () {
    comprobanteTransferenciaDiv.style.display = 'none'
    container.style.display = 'none'
    opciones.style.display = 'block'
});

// Agregar evento al botón Consignar Dinero para mostrar el div
depositBtn.addEventListener('click', function () {
    consignarDiv.style.display = 'block'
    opciones.style.display = 'none'
});

// Agregar evento al botón "Realizar Consignación"
realizarConsignacionBtn.addEventListener('click', function () {
    const montoConsignacion = parseFloat(montoConsignacionInput.value);

    if (isNaN(montoConsignacion) || montoConsignacion < 10000) {
        alert("La consignación debe ser igual o mayor a 10000.");
    } else {
        saldo += montoConsignacion;
        alert(`Consignación exitosa. Nuevo saldo: ${saldo}`);

        agregarMovimiento("Consignacion", montoConsignacion);
        montoConsignacionInput.value = '';
    }
});

// Agregar evento al botón Cancelar Consignación
cancelarConsignacionBtn.addEventListener('click', function () {
    consignarDiv.style.display = 'none'
    opciones.style.display = 'block'
});


// Función para agregar un movimiento al historial
function agregarMovimiento(tipo, valor) {
    const fecha = new Date()
    const movimiento = { fecha, tipo, valor }
    historialMovimientos.push(movimiento)
}
showTransactionsBtn.addEventListener('click', function mostrarHistorial() {


    historialContainer.innerHTML = ''

    const tituloDiv = document.createElement('div')
    tituloDiv.classList.add('titulo-historial')

    const titulo = document.createElement('h2')
    titulo.textContent = 'Historial de Movimientos'
    tituloDiv.appendChild(titulo)
    historialContainer.appendChild(tituloDiv);

    // Recorrer el historial y mostrar cada movimiento
    historialMovimientos.forEach(movimiento => {
        const item = document.createElement('div')
        item.textContent = `Fecha: ${movimiento.fecha}, Tipo: ${movimiento.tipo}, Valor: ${movimiento.valor}`
        historialContainer.appendChild(item)
    })

    // Mostrar el botón para volver al menú principal
    const botonVolver = document.createElement('button')
    botonVolver.textContent = 'Volver al Menú Principal'
    botonVolver.id = 'volver-main-menu-historial'
    botonVolver.classList.add('boton-historial')
    
    const contenedorBoton = document.createElement('div');
    contenedorBoton.classList.add('centrar-boton'); // Agregar una clase CSS al div contenedor

    contenedorBoton.appendChild(botonVolver);

    historialContainer.appendChild(contenedorBoton);


    // Asignar la función al botón de volver al menú principal
    botonVolver.addEventListener('click', volverMainMenuDesdeHistorial);

    historialContainer.style.display = 'block';
    container.style.display = 'none'
    opciones.style.display = 'none'
});

function volverMainMenuDesdeHistorial() {
    const historialContainer = document.getElementById('historial-container');
    const opciones = document.getElementById('main-menu');

    historialContainer.style.display = 'none';
    opciones.style.display = 'block';
}


//funcion para cerrar cession 
document.getElementById('logout').addEventListener('click', function () {
    cerrarSesion();
})
