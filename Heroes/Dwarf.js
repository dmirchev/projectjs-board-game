function Dwarf(x, y, playerID) 
{
    Hero.call(this, x, y, playerID);

    this.name = "Dwarf";
    
    this.attack = 6;
    this.armor = 2;
    this.health = 12;
    this.attackingSquares = 2;
    this.speed = 2;
}