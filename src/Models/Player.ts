// A palavra "class" define que estamos criando uma classe/molde 
//A palavra "export" permite que esse arquivo seja usado por outros arquivos (como o app.ts)

export class Player {
    public name:string;
    public health:number;
    public level: number;

        // construtotres (o construtor é um metodo especial que executamos/executado automaticamente quando a classe é refereneciada/instanciada
        // uma unica vez)

        constructor(name: string, health: number = 100, level: number = 1){
//a palvra this faz referencia a propria classe ,ou seja :
//"pegue o atributo 'name' da classe Player e atribua o valor 
// do parametro 'name' a ele "

            this.name = name
            this.health = health
            this.level = level

        }
public attack (): string{
    const damage = this.level * 10;
    return`${this.name} atacou e causou ${damage} de dano!`;
} //

    public takedamage (amout: number): string{
        this.health -= amout;
        if (this.health < 0){
            this.health = 0; // não deixa a saúde ficar negativa
                    }
        return `${this.name} Foi Derrotado!`
return`${this.name} recebeu ${amout} de dano e agora tem ${this.health} de saúde.`;
                }
                // o jogador recebe dano com base na quantidade fornecida e a saúde atualizada é retornada, 
                // e o 0 é o valor minimo de vida que o jogador pode ter, não podendo ficar negativo.


public levelup (): string{
    this.level += 1;
    return `${this.name} subiu para o nível ${this.level}!`;
    // o jogador sobe de nivel e o nivel é incrementado em 1
}

public heal (amount: number): number {
    this.health += amount;
    return this.health;}
    // o jogador é curado com base na quantidade de pontos de vida fornecida e a saúde atualizada é retornada
}