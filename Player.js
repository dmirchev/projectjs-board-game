var playserIDCounter = -1;

function Player(name, cssName)
{
    this.id = playserIDCounter++;
    this.name = name;
    this.cssName = cssName;
    this.heroesCounter = -1;
    this.heroesCollection = HeroesManager.createHeroes(playserIDCounter);

    this.selectedHero = null;
}

Player.prototype.PositionHeroes = function()
{
    for(var i = 0; i < this.heroesCollection.length; i++)
    {
        this.heroesCollection[i].SetPosition(x, y);
    }
}

Player.prototype.PlaceNextHero = function()
{
    heroesCounter++;
    this.selectedHero = this.heroesCollection[this.heroesCounter];
}