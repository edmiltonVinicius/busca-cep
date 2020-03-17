function escondeBuscar(){
    const btnBuscar = document.querySelector('.busca')
    const resultado = document.querySelector('.containerDados')

    btnBuscar.style.display='none'
    resultado.style.display='block'
}

function mostrarBuscar(){
    const btnBuscar = document.querySelector('.busca')
    const resultado = document.querySelector('.containerDados')

    resultado.style.display='none'
    btnBuscar.style.display='block'
    document.querySelector('input[name=entradaCep]').value=''
}

function validaEntrada(){
    let entrada = document.querySelector('input[name=entradaCep]').value
    let erro = document.querySelector('.erro')
    
    if(entrada.length < 8 || entrada.length > 8){
        alert(`ta doidão?`)
    }else {
        escondeBuscar()
        return entrada
    } 
    
}

function consultaCep() {
    const xhr = new XMLHttpRequest()
    const cep = validaEntrada()
    const endereco = document.querySelector('.endereco')
    const bairro = document.querySelector('.bairro')
    const cidade = document.querySelector('.cidade')
    const uf = document.querySelector('.uf')
    
    xhr.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/')
    xhr.send(null)

    xhr.onreadystatechange = function() {
        let resultado
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                resultado = JSON.parse(xhr.responseText)
                console.log(resultado)
                endereco.innerHTML=resultado.logradouro
                bairro.innerHTML=resultado.bairro
                cidade.innerHTML=resultado.localidade
                uf.innerHTML=resultado.uf
            }else if(xhr.status == 404) {
                alert('Cerp não encontrado')
            }
        }
        
    }
}

