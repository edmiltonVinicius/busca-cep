(() => {
    document.querySelector('[name="entradaCep"]').addEventListener('keypress', function(e){
        e.keyCode < 48 || e.keyCode > 57 ? e.preventDefault() : ''
    })
})()

function consultarCep() {
    let entrada = document.querySelector('input[name=entradaCep]').value
 
    if (entrada.length == 0 || entrada == '') {
        exibirErro('Por favor Insira algum cep!')
    } else if(entrada.length < 8 ){
        exibirErro('CEP informado está inválido!')
    }
     else {
        consultaCep(entrada)
    }
}

function consultaCep(c) {
    const xhr = new XMLHttpRequest()
    const cep = c

    xhr.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/')
    xhr.send(null)

    xhr.onreadystatechange = function () {
        let resultado
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resultado = JSON.parse(xhr.responseText)
                if (!('erro' in resultado)) {
                    escondeBuscar()
                    exbibiResultado(resultado)
                } else {
                    exibirErro('CEP NÃO ENCONTRADO!')
                }
            } else {
                exibirErro('Ocorreu algum erro, tente novamente!')
            }
        } 
    }
}

function exbibiResultado({ logradouro, bairro, localidade, uf }){
    document.querySelector('.endereco').innerHTML = logradouro
    document.querySelector('.bairro').innerHTML = bairro
    document.querySelector('.cidade').innerHTML = localidade
    document.querySelector('.uf').innerHTML = uf
}

function escondeBuscar() {
    const btnBuscar = document.querySelector('.busca-js')
    const resultado = document.querySelector('.containerDados')
    const info = document.querySelector('.info')

    btnBuscar.style.display = 'none'
    info.style.display = 'none'
    resultado.style.display = 'block'
}

function mostrarBuscar() {
    const btnBuscar = document.querySelector('.busca-js')
    const resultado = document.querySelector('.containerDados')
    const info = document.querySelector('.info')

    resultado.style.display = 'none'
    btnBuscar.style.display = 'block'
    info.style.display = 'block'
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
    document.querySelector('.busca-js').style.display='none'
    divErro.style.display='block'
    document.querySelector('input[name=entradaCep]').focus()
}

function esconderErro() {
    const divErro = document.querySelector('.divErro')
    const textoErro = document.querySelector('.textoErro')
    textoErro.innerHTML=''
    divErro.style.display='none'
    document.querySelector('.busca-js').style.display='block'
    document.querySelector('input[name=entradaCep]').focus()
}


