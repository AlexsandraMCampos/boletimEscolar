// const alunos = []; // Armazena os dados dos alunos

// function Sub() {
//     // Captura os valores dos inputs
//     const nome = document.getElementById('alunoNome').value;
//     const notas = [
//         parseFloat(document.getElementById('b1').value),
//         parseFloat(document.getElementById('b2').value),
//         parseFloat(document.getElementById('b3').value),
//         parseFloat(document.getElementById('b4').value)
//     ];

//     // Calcula a média das notas
//     const media = notas.reduce((acc, nota) => acc + nota, 0) / notas.length;

//     // Adiciona o aluno ao array de alunos
//     alunos.push({
//         nome: nome,
//         notas: notas,
//         media: media,
//         situacao: '' // A situação será determinada mais tarde
//     });

//     // Limpa os campos de input após adicionar à tabela
//     document.getElementById('alunoNome').value = '';
//     document.getElementById('b1').value = '';
//     document.getElementById('b2').value = '';
//     document.getElementById('b3').value = '';
//     document.getElementById('b4').value = '';

//     if (alunos.length === 5) { // Supondo que você queira processar 5 alunos
//         calcularSituacaoEExibirResultados();
//     }
// }

// function calcularSituacaoEExibirResultados() {
//     const mediaGeral = alunos.reduce((acc, aluno) => acc + aluno.media, 0) / alunos.length;

//     alunos.forEach(aluno => {
//         // Determina a situação do aluno
//         if (aluno.media >= 7.0) {
//             aluno.situacao = 'Aprovado';
//         } else if (aluno.media >= 6.0) {
//             aluno.situacao = 'Recuperação';
//         } else {
//             aluno.situacao = 'Reprovado';
//         }

//         // Adiciona as informações à tabela de resultados
//         const tabelaResultados = document.querySelector('.conclusao');
//         const novaLinha = tabelaResultados.insertRow(-1); // Insere uma nova linha no final da tabela

//         // Aplica a formatação de cores conforme a situação
//         novaLinha.style.backgroundColor = aluno.situacao === 'Aprovado' ? 'green' :
//                                           aluno.situacao === 'Reprovado' ? 'red' : 'yellow';

//         // Cria e insere as células na nova linha
//         const celulaNome = novaLinha.insertCell(0);
//         celulaNome.innerHTML = aluno.nome;

//         const celulaMedia = novaLinha.insertCell(1);
//         celulaMedia.innerHTML = aluno.media.toFixed(2);

//         const celulaSituacao = novaLinha.insertCell(2);
//         celulaSituacao.innerHTML = aluno.situacao;
//     });

//     // Exibe a média geral da turma e alunos abaixo da média geral
//     console.log(`Média Geral da Turma: ${mediaGeral.toFixed(2)}`);
//     console.log('Alunos abaixo da média geral:');
//     alunos.filter(aluno => aluno.media < mediaGeral).forEach(aluno => {
//         console.log(aluno.nome);
//     });
// }

// // Adiciona a função Sub ao escopo global para que possa ser chamada pelo onclick
// window.Sub = Sub;


let alunos = []; // Armazena os dados dos alunos

function Sub() {
    if (alunos.length >= 5) {
        alert("Número máximo de alunos atingido.");
        return;
    }

    // Captura os valores dos inputs
    const nome = document.getElementById('alunoNome').value;
    const notas = [
        parseFloat(document.getElementById('b1').value || 0),
        parseFloat(document.getElementById('b2').value || 0),
        parseFloat(document.getElementById('b3').value || 0),
        parseFloat(document.getElementById('b4').value || 0)
    ];

    // Calcula a média das notas
    const media = notas.reduce((acc, nota) => acc + nota, 0) / notas.length;
    
    // Determina a situação do aluno
    let situacao = 'Reprovado';
    if (media >= 7) situacao = 'Aprovado';
    else if (media >= 6) situacao = 'Recuperação';

    // Adiciona o aluno ao array de alunos
    alunos.push({ nome, notas, media, situacao });

    // Adiciona as informações à tabela de resultados
    adicionarAlunoTabela(nome, media, situacao);

    // Limpa os campos de input
    limparInputs();

    // Após adicionar 5 alunos, calcula e exibe a média geral e alunos abaixo da média geral
    if (alunos.length === 5) {
        calcularMediaGeralEAlunosAbaixo();
    }
}

function adicionarAlunoTabela(nome, media, situacao) {
    const tabelaResultados = document.querySelector('.conclusao');
    const novaLinha = tabelaResultados.insertRow(-1);
    novaLinha.style.backgroundColor = situacao === 'Aprovado' ? 'green' :
                                      situacao === 'Recuperação' ? 'yellow' : 'red';
    novaLinha.insertCell(0).innerHTML = nome;
    novaLinha.insertCell(1).innerHTML = media.toFixed(2);
    novaLinha.insertCell(2).innerHTML = situacao;
}

function limparInputs() {
    document.getElementById('alunoNome').value = '';
    document.getElementById('b1').value = '';
    document.getElementById('b2').value = '';
    document.getElementById('b3').value = '';
    document.getElementById('b4').value = '';
}

function calcularMediaGeralEAlunosAbaixo() {
    const mediaGeral = alunos.reduce((acc, aluno) => acc + aluno.media, 0) / alunos.length;
    document.getElementById('mediaGeralTurma').textContent = `Média Geral da Turma: ${mediaGeral.toFixed(2)}`;
    
    const alunosAbaixoMedia = alunos.filter(aluno => aluno.media < mediaGeral);
    const listaAlunosAbaixoMedia = document.getElementById('listaAlunosAbaixoMedia');
    listaAlunosAbaixoMedia.innerHTML = ''; // Limpa a lista antes de adicionar novos itens
    alunosAbaixoMedia.forEach(aluno => {
        const item = document.createElement('li');
        item.textContent = aluno.nome;
        listaAlunosAbaixoMedia.appendChild(item);
    });
}

window.Sub = Sub;
