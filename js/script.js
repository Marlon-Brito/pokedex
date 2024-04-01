// Selecionando os elementos
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Variável global com pokémon inicial
let searchPokemon = 1;

// Função que fará a busca dos pokémons via parâmetro
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // Se encontrar o pokémon irá buscá-lo
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return(data);
    }
}

// Função que pegará os dados e renderizar na tela
const renderPokemon = async (pokemon) => {
    // Exibindo mensagem de carregando antes de executar a consulta da API e tirando o id
    pokemonName.innerText = 'Loading...';
    pokemonNumber.innerText = '';

    // Recuperando os dados do pokémon
    const data = await fetchPokemon(pokemon);

    // Validando erro de pokémon não encontrado, só vai exibir se tiver um resultado
    if (data){
        // Apresentando os dados na tela
        pokemonImage.style.display = 'block';
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        // Limpar campo após pesquisar
        input.value = '';
        // Se encontrou algum, irá atualizar o valor da variável global com ele, resolvendo o problema de voltar ou avançar um pokémon atual buscado
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerText = 'Not found :c';
        pokemonNumber.innerText = '';
    }
}

// Função pra pegar o valor do input e fazer a pesquisa
form.addEventListener('submit', (event) => {
    // Bloqueando comportamento padrão do formulário
    event.preventDefault();
    // Ao enviar o formulário renderizar pokémon e deixando as letras minúsculas
    renderPokemon(input.value.toLowerCase());
});

// Botões
buttonPrev.addEventListener('click', () => {
    // Pegando variável global, decrementando e renderizando com o novo valor, mas isso só ocorrerá se o valor for maior que um, o um é o limite tirando a ação
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    // Pegando variável global, incrementando e renderizando com o novo valor
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

// Se não tiver pokémon colocará o primeiro como inicial usando a variável global
renderPokemon(searchPokemon);

/* Instruções:

 * Função que fará a busca dos pokémons. E ela terá um parâmetro pois precisará receber o seu nome ou id;
 * Criará uma const APIResponse que será a resposta da API, com o endpoint que se buscará os dados. Concatenando no fim o pokemon que está se buscando;
 * Porém o fetch é assíncrono, sendo uma promise, não se sabe quanto tempo levará para gerar um resultado. Então pra esperar uma resposta usa-se o await, mas nem esquecendo que só pode usá-lo em funções assíncronas (async);
 * Para ver o resultado deve passar um pokémon como parâmetro e extrair em json, mas a função de conversão é assíncrona também, tendo que esperar;
 * Ao invés do console retornando esses dados agora;
 * E fazendo uma validação pra só buscar dados se estiver tudo OK.

 * Função que pegará os dados e renderizar na tela. Fazendo uma const data que pegará os dados do pokémon através da função criada, devendo esperá-la pois é assíncrona;
 * Selecionando os elementos e colocando os dados neles. Pra isso pegando o data e buscando as respectivas propriedades do objeto json resgatado. Mas na imagem a seleção terá que usar o "[]" ao invés do ".", pois não irá conseguir acessar nomes com ífen usando o ".", por isso deve-se usar o "[]";
 * Também limpando o campo de pesquisa;
 * E fazendo uma validação pra só exibir se tiver dados. Senão tiver gerará um feedback para o usuário;
 * Exibir mensagem de carregamento até a API gerar um resultado e renderizar, tirando o id também;
 * Se recuperou algum pokémon, irá atualizar o valor da variável global com o id dele, resolvendo o problema de voltar ou avançar um pokémon atual buscado.

 * Função pra pegar o valor do input e fazer a pesquisa. Tirando o comportamento padrão do formulário e exibindo os dados com a função de renderização, deixando qualquer digitação em minúsculas, pois a API só aceita resultados nessa caixa de letras. 

 * Botões de avançar e retroceder.

 * Definindo pokémon inicial com a variável global criada.

*/