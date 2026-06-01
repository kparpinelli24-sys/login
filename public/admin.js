const API =
'http://localhost:3000/questoes';

const token =
localStorage.getItem('token');

if(!token){

    window.location.href =
    '/login.html';

}

const tabela =
document.getElementById(
'tabelaQuestoes'
);

const form =
document.getElementById(
'questaoForm'
);

async function carregarQuestoes(){

    const resposta =
    await fetch(API,{

        headers:{
            Authorization:
            `Bearer ${token}`
        }

    });

    const questoes =
    await resposta.json();

    tabela.innerHTML = '';

    questoes.forEach(q=>{

        tabela.innerHTML += `
        <tr>

            <td>${q.id_questao}</td>

            <td>${q.pergunta}</td>

            <td>${q.tema}</td>

            <td>

                <button
                class="editar"
                onclick="editarQuestao(${q.id_questao})">
                Editar
                </button>

                <button
                class="excluir"
                onclick="deletarQuestao(${q.id_questao})">
                Excluir
                </button>

            </td>

        </tr>
        `;

    });

}

form.addEventListener(
'submit',
async(e)=>{

    e.preventDefault();

    const id =
    document.getElementById(
    'idQuestao'
    ).value;

    const dados = {

        pergunta:
        document.getElementById(
        'pergunta'
        ).value,

        tema:
        document.getElementById(
        'tema'
        ).value,

        link:
        document.getElementById(
        'link'
        ).value,

        id_categoria:
        document.getElementById(
        'id_categoria'
        ).value,

        id_vestibular:
        document.getElementById(
        'id_vestibular'
        ).value

    };

    if(id){

        await fetch(
        `${API}/${id}`,
        {

            method:'PUT',

            headers:{
                'Content-Type':
                'application/json',

                Authorization:
                `Bearer ${token}`
            },

            body:JSON.stringify(dados)

        });

    }else{

        await fetch(
        API,
        {

            method:'POST',

            headers:{
                'Content-Type':
                'application/json',

                Authorization:
                `Bearer ${token}`
            },

            body:JSON.stringify(dados)

        });

    }

    form.reset();

    document.getElementById(
    'idQuestao'
    ).value='';

    carregarQuestoes();

});

async function editarQuestao(id){

    const resposta =
    await fetch(
    `${API}/buscar/id/${id}`,
    {

        headers:{
            Authorization:
            `Bearer ${token}`
        }

    });

    const q =
    await resposta.json();

    document.getElementById(
    'idQuestao'
    ).value =
    q.id_questao;

    document.getElementById(
    'pergunta'
    ).value =
    q.pergunta;

    document.getElementById(
    'tema'
    ).value =
    q.tema;

    document.getElementById(
    'link'
    ).value =
    q.link || '';

    document.getElementById(
    'id_categoria'
    ).value =
    q.id_categoria;

    document.getElementById(
    'id_vestibular'
    ).value =
    q.id_vestibular;
}

async function deletarQuestao(id){

    if(!confirm(
        'Deseja excluir esta questão?'
    )) return;

    await fetch(
    `${API}/${id}`,
    {

        method:'DELETE',

        headers:{
            Authorization:
            `Bearer ${token}`
        }

    });

    carregarQuestoes();
}

document
.getElementById(
'logoutButton'
)
.addEventListener(
'click',
()=>{

    localStorage.removeItem(
    'token'
    );

    window.location.href =
    '/login.html';

});

carregarQuestoes();