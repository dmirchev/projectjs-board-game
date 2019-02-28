var HeroesManager = 
{
    "createHeroes" : function(playerID)
    {
        var heroes = []

        for(var i = 0; i < 6; i++)
        {
            var hero;

            switch(i)
            {
                case 0:
                case 1:
                    hero = new Knight(0, 0, playerID);
                    break;
                case 2:
                case 3:
                    hero = new Elf(0, 0, playerID);
                    break;
                case 4:
                case 5:
                    hero = new Dwarf(0, 0, playerID);
                    break;
            }

            heroes.push(hero);
        }

        return heroes;
    }
}