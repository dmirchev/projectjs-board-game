function Hero(x, y, playerID) 
{
    this.playerID = playerID;
    
    this.name;

    this.x = x;
    this.y = y;
    this.isAlive = false;

    //this.type = type;

    this.attack;
    this.armor;
    this.health;
    this.attackingSquares;
    this.speed;
}

Hero.prototype.SetPosition = function(x, y)
{
    this.x = x;
    this.y = y;
}

Hero.prototype.Move = function()
{

}

Hero.prototype.Attack = function()
{
    
}

Hero.prototype.Heal = function()
{
    
}