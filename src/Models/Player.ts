// A palavra "class" define que estamos criando uma classe/molde 
//A palavra "export" permite que esse arquivo seja usado por outros arquivos (como o app.ts)

export class player {
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
}

    public takedamage (amout: number): string{
        this.health -= amout;
        if (this.health < 0){
            this.health = 0; // não deixa a saúde ficar negativa
                    }
        return `${this.name} Foi Derrotado!`
return`${this.name} recebeu ${amout} de dano e agora tem ${this.health} de saúde.`;
                }


}