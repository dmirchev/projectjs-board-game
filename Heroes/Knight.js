function Knight(x, y, playerID) 
{
    Hero.call(this, x, y, playerID);

    this.name = "Knight";
    
    this.attack = 8;
    this.armor = 3;
    this.health = 15;
    this.attackingSquares = 1;
    this.speed = 1;
}