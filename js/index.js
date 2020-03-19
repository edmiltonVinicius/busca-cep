function validaEntrada() {
    let entrada = document.querySelector('input[name=entradaCep]').value
    entrada = entrada.replace('-', '')

    if (entrada.length < 8 || entrada.length > 9) {
        exibirErro('CEP informado está inválido!')
    } else {
        consultaCep(entrada)
    }

}
function escondeBuscar() {
    const btnBuscar = document.querySelector('.busca')
    const resultado = document.querySelector('.containerDados')

    btnBuscar.style.display = 'none'
    resultado.style.display = 'block'
}

function mostrarBuscar() {
    const btnBuscar = document.querySelector('.busca')
    const resultado = document.querySelector('.containerDados')

    resultado.style.display = 'none'
    btnBuscar.style.display = 'block'
    document.querySelector('input[name=entradaCep]').value = ''
    document.querySelector('.endereco').innerHTML = ''
    document.querySelector('.bairro').innerHTML = ''
    document.querySelector('.cidade').innerHTML = ''
    document.querySelector('.uf').innerHTML = ''
}

function exibirErro(texto) {
    const divErro = document.querySelector('.divErro')
    const textoErro = document.querySelector('.textoErro')
    textoErro.innerHTML=texto
    document.querySelector('.busca').style.display='none'
    divErro.style.display='block'
}

function esconderErro() {
    const divErro = document.querySelector('.divErro')
    const textoErro = document.querySelector('.textoErro')
    textoErro.innerHTML=''
    divErro.style.display='none'
    document.querySelector('.busca').style.display='block'
}

function consultaCep(c) {
    const xhr = new XMLHttpRequest()
    const cep = c
    const endereco = document.querySelector('.endereco')
    const bairro = document.querySelector('.bairro')
    const cidade = document.querySelector('.cidade')
    const uf = document.querySelector('.uf')

    xhr.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/')
    xhr.send(null)

    xhr.onreadystatechange = function () {
        let resultado
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resultado = JSON.parse(xhr.responseText)
                if (!('erro' in resultado)) {
                    escondeBuscar()
                    endereco.innerHTML = resultado.logradouro
                    bairro.innerHTML = resultado.bairro
                    cidade.innerHTML = resultado.localidade
                    uf.innerHTML = resultado.uf
                } else {
                    exibirErro('CEP NÃO ENCONTRADO!')
                }
            } else {
                exibirErro('Ocorreu algum erro, tente novamente!')
            }
        } 

    }
}
