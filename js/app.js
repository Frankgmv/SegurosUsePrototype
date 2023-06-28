function Seguro(marca, year, tipo) {
    this.marca = marca
    this.year = year
    this.tipo = tipo
}

Seguro.prototype.cotizarSeguro = function () {
    // ?    precios 

    const diferencia = new Date().getFullYear() - this.year
    let cantidad;
    const base = 2000

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35
            break;
        default:

            break;
    }

    cantidad -= ((diferencia * 3) * cantidad) / 100

    if (this.tipo == 'completo') {
        cantidad *= 1.50
    } else {
        cantidad *= 1.30
    }
    return cantidad;
}

function UI() {}

UI.prototype.llenarOpciones = () => {
    const maxYear = new Date().getFullYear(),
        minYear = maxYear - 20;

    const select = document.querySelector('#year');

    for (let i = maxYear; i > minYear; i--) {
        const option = document.createElement('option')
        option.value = i;
        option.textContent = i
        select.appendChild(option)
    }
}

UI.prototype.mostrarAlerta = (mensaje, tipoError) => {
    const formulario = document.querySelector('#cotizar-seguro');
    const alert = formulario.querySelector(".alerta");

    if (alert) {
        alert.remove();
    }

    const prr = document.createElement('p');
    prr.classList.add('alerta', 'mt-5', tipoError);
    prr.textContent = mensaje;

    formulario.insertBefore(prr, document.querySelector('#resultado'));

    setTimeout(() => {

        prr.remove();

    }, 1200);

}

UI.prototype.clearHTML = function () {
    let mostrarResultado = document.querySelector('#resultado');
    mostrarResultado.innerHTML = '';
}

UI.prototype.mostrarResultados = function (total, seguro) {
    let {
        marca,
        tipo,
        year
    } = seguro

    let mostrarResultado = document.querySelector('#resultado');
    const spinner = document.querySelector('#cargando');
    spinner.classList.remove('hidden');

    let textMarca;
    switch (marca) {
        case '1':
            textMarca = 'Americano'
            break;
        case '2':
            textMarca = 'Asiático'
            break;
        case '3':
            textMarca = 'Europeo'
            break;
        default:

            break;
    }
    setTimeout(() => {
        spinner.classList.add('hidden');
        mostrarResultado.innerHTML = `
        <div class="mt-5">
            <p class="header">Tu Resumen</p>
            <p class="font-bold">Marca: <span class="font-normal"> ${textMarca}</span></p>
            <p class="font-bold">Año:<span class="font-normal"> ${year}</span></p>
            <p class="font-bold">tipo:<span class="font-normal capitalize"> ${tipo}</span></p>
            <p class="font-bold">Total:<span class="font-normal"> $ ${total}</span></p>
        </div>
        `;
    }, 1200);
}

const UFace = new UI()

document.addEventListener('DOMContentLoaded', () => {

    UFace.llenarOpciones(); //Llenar las opciones de años
    eventListener();
})


function eventListener() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', (e) => {
        UFace.clearHTML()
        e.preventDefault();
        empezarCotizacion();
    });
}

function empezarCotizacion() {
    // Read data
    const marca = document.querySelector("#marca").value;
    const year = document.querySelector("#year").value;
    const tipo = document.querySelector("input[name=tipo]:checked").value;

    if (!marca || !year || !tipo) {
        UFace.mostrarAlerta('Rellena los campos...', 'error')
        return;
    }
    UFace.mostrarAlerta('Cotizando Seguro...', 'correcto')

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    UFace.mostrarResultados(total, seguro);
}