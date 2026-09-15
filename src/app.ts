// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express , Request , Response } from "express";

import { player } from "./Models/Player.js";
import { get } from "node:http";


// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

// Middleware para permitir que o servidor entenda requisições com corpo em JSON
app.use(express.json());

// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;


//Instanciaação de um jogador utilizando a classe player
// Criamos (instanciamos) um novo jogador chamado "Hero" com 100 de Saúde e nivel 1
// a partir da classe Player em que foi importada do arquivo Player.ts 

let player1: player = new player ("Hero", 100, 5)

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

// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Rotas Disponiveis:");
    console.log(`GET http://localhost:${PORT} /player - Obter informações do jogador`);
    console.log(`POST http://localhost:${PORT} /player/attack - Atacar com o jogador`);
    console.log(`POST http://localhost:${PORT} /player/damage - Receber dano no jogador`);
    console.log(`POST http://localhost:${PORT} /player/takedamage - Receber dano no jogador e obter informações atualizadas`);
});