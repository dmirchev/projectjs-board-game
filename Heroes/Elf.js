function Elf(x, y, playerID) 
{
    Hero.call(this, x, y, playerID);

    this.name = "Elf";
    
    this.attack = 5;
    this.armor = 1;
    this.health = 10;
    this.attackingSquares = 3;
    this.speed = 3;
}