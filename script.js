async function buscaEndereco(cep){//await so pode ser utilizada na async function
    const mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ''
    try {
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCepConvertida = await consultaCep.json()
        if (consultaCepConvertida.erro) {
        throw Error('Cep não existente!')
        }
        const cidade = document.getElementById('cidade')
        const logradouro = document.getElementById('endereco')
        const estado = document.getElementById('estado')
        const bairro = document.getElementById('bairro')

        cidade.value = consultaCepConvertida.localidade
        logradouro.value = consultaCepConvertida.logradouro
        estado.value = consultaCepConvertida.uf
        bairro.value = consultaCepConvertida.bairro

        console.log(consultaCepConvertida)
        return consultaCepConvertida
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente Novamente!</p>`
            console.log(erro)
    }
}

const cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))
