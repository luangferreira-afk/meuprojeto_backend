// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express , Request , Response } from "express";

import fs from "fs";   //importa a biblioteca fs (file system) para manipulação de arquivos
import { Player } from "./Models/Player.js";


// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

// Middleware para permitir que o servidor entenda requisições com corpo em JSON
app.use(express.json());



// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

//Define o noeme do arquivo onde os arquivos  serão salvos
const DATA_FILE = "./data/players.json";

//Função para garantir que o diretório de dados exista antes de salvar os dados
//se o diretório não existir, ele será criado

function ensureDataDirectoryExists() {
    const datafolder = "./data";
    if (!fs.existsSync(datafolder)) {
        fs.mkdirSync(datafolder);
    }
} 

// Chamada da função para garantir que o diretório de dados exista
// antes de qualquer operação de leitura ou escrita no arquivo
ensureDataDirectoryExists();

// Função para salvar os dados do jogador em um arquivo JSON
function savePlayerData(player: Player) {
    const playerdata = JSON.stringify(player, null, 2); 
    // Converte o objeto player em uma string JSON formatada
    fs.writeFileSync(DATA_FILE, playerdata); 
    // Salva a string JSON no arquivo especificado
}

//função para carregar os dados do jogador a partir de um arquivo JSON
function loadPlayerData(): Player {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(data);
    }
    //cria um novo jogador padrão se o arquivo não existir
    const newPlayer = new Player("Default", 100, 1); // Cria um novo jogador padrão
    return newPlayer;
}
//inicializa o jogador carregando os dados do arquivo JSON
let player: Player = loadPlayerData();




// Atenção: A função loadPlayerData() retorna um objeto "puro" (sem métodos da classe player), então se você quiser usar os métodos da classe player, você precisará criar uma nova instância da classe player com os dados carregados.

//Instanciaação de um jogador utilizando a classe player
// Criamos (instanciamos) um novo jogador chamado "Hero" com 100 de Saúde e nivel 1
// a partir da classe Player em que foi importada do arquivo Player.ts 

let player1: Player = new Player ("Hero", 100, 5)

// Rota Get para obeter informações de um jogador
// Quando o usuário acessar a rota "/player", o servidor responderá com os dados do jogador 
// A Função de call back recebe dois paramentros : req (requesição) e res (Resposta)

app.get("/player", (req: Request, res: Response) => {
res.json({
    message: "informaçoes do Player",
    player:player1
});
});


app.post("/player/attack", (req: Request, res: Response) => {
    const attackMessage = player1.attack();
    res.json({
        message: attackMessage,

    });
});

app.post("/player/damage", (req: Request, res: Response) => {
    const { damage } = req.body; // Obtém a quantidade de dano do corpo da requisição
    const damageMessage = player1.takedamage(damage);
    //salva os dados do jogador no arquivo JSON após receber dano
    savePlayerData(player1);
    res.json({
        message: damageMessage
    });
});

app.post("/player/takedamage", (req: Request, res: Response) => {
    const { damage } = req.body;
    const damageMessage = player1.takedamage(damage);
    res.json({
        action: damageMessage,
        currenthealth: player1.health,
        currentlevel: player1.level
    });
});

app.post("/player/levelup", (req: Request, res: Response) => {
    const levelupMessage = player1.levelup();
    res.json({  
        action: levelupMessage,
        currentlevel: player1.level
    });
});

app.post("/player/heal", (req: Request, res: Response) => {
    const { amount } = req.body;   
    const newHealth = player1.heal(amount);
    res.json({ 
        action: `${player1.name} foi curado em ${amount} pontos de vida.`,
        currenthealth: newHealth
    });
});

// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Rotas Disponiveis:");
    console.log(`GET http://localhost:${PORT}/player - Obter informações do jogador`);
    console.log(`POST http://localhost:${PORT}/player/attack - Atacar com o jogador`);
    console.log(`POST http://localhost:${PORT}/player/damage - Receber dano no jogador`);
    console.log(`POST http://localhost:${PORT}/player/takedamage - Receber dano no jogador e obter informações atualizadas`);
    console.log(`POST http://localhost:${PORT}/player/levelup - Subir de nível o jogador`);
    console.log(`POST http://localhost:${PORT}/player/heal - Curar o jogador`);
});