var parentName = "game-board-action";
var currentPlayerHeading;
var selectedHeroName;
var message;
var messageCollection = ["Please place your heroes", "You Cannot place your hero on the Battlefield", 
"You Cannot place your hero on your Opponent's Field"]
var speedClassNames = ["speedOne", "speedTwo", "speedThree"]

/* var currentPlayer = 0;
var players = [];
var currentHero = 0; */

var ActionManager =
{
    "actionType" : 0, //0 - Place / 1 - Select Hero / 2 - Move Hero
    "players" : [],
    "currentPlayer" : 0,
    "currentHero" : 0,
    "selectedHero" : null,
    "createManager" : function(playerOne, playerTwo)
    {
        this.players.push(playerOne);
        this.players.push(playerTwo);

        var parent = DOM.getElementByID(parentName);

        currentPlayerHeading = DOM.createElementByTag("h1", "player", "info-heading", parent.id);
        DOM.createInnerHTML(currentPlayerHeading, this.players[this.currentPlayer].name);

        selectedHeroName = DOM.createElementByTag("h1", "hero", "info-heading", parent.id);
        DOM.createInnerHTML(selectedHeroName, this.players[this.currentPlayer].heroesCollection[this.currentHero].name);

        message = DOM.createElementByTag("h1", "message", "info-message", parent.id);
        DOM.createInnerHTML(message, messageCollection[0]);
    },

    "placeHero" : function(cell)
    {
        if(this.currentPlayer >= 2)
            return;
        
        if(!this.canPlace(cell))
            return;
        
        var hero = this.players[this.currentPlayer].heroesCollection[this.currentHero];
        cell.hero = hero;

        DOM.createInnerHTML(cell.element.heroName, hero.name);
        cell.element.heroName.className = "h1-" + this.players[this.currentPlayer].cssName;

        DOM.createInnerHTML(cell.element.heroHealth, hero.health);

        this.currentHero++;

        if(this.currentHero > 5)
        {
            this.currentHero = 0;
            this.currentPlayer++;
            
            //Change Action when Player B has places all of his Heroes
            if(this.currentPlayer > 1)
            {
                this.actionType++;

                //Player A
                this.currentPlayer = 0;
            }
        }

        if(this.currentPlayer < this.players.length)
        {
            DOM.createInnerHTML(selectedHeroName, this.players[this.currentPlayer].heroesCollection[this.currentHero].name);
            DOM.createInnerHTML(currentPlayerHeading, this.players[this.currentPlayer].name);
        }
    },

    "selectHero" : function(cell)
    {
        //console.log(cell);
        if(cell.hero == null)
            return;
        
        if(cell.hero.playerID != this.currentPlayer)
            return;
        
        selectedHero = cell.hero;
        this.displayHeroInfo(selectedHero);

        this.displayMovement(cell, cell.hero.speed);

        this.actionType++;
        console.log("actionType: " + this.actionType);
    },

    "displayMovement" : function(cell, speed)
    {
        return;
        //diameter
        var hight = (2 * speed) + 1;
        var width = 1;
        console.log("speed: " + speed);
        //var additionalOffset = -1;
        var additionalOffset = -(speed - 1);
        console.log(additionalOffset);

        var x = cell.x - 1;
        var y = cell.y - speed - 1;

        console.log(cell);

        console.log(cell.x + " / " + cell.y);
        console.log(x + " / " + y);

        console.log("hight: " + hight);

        for(var i = 0; i < hight; i++)
        {
            y++;
            console.log("y: " + y);

            if(speed == 2 && y == cell.y + additionalOffset)
            {
                additionalOffset *= -1;
            }

            if(speed == 3)
            {
                if(y == cell.y + additionalOffset)
                {
                    additionalOffset *= -1;
                
                    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHhh");
                    if(y == cell.y - 1)
                    {
                        additionalOffset -= 2;
                        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHhh");
                    }
                        
                    
                    additionalOffset--;
                }
            }
            
            for(var j = 0; j < width; j++)
            {
                x++;
                console.log("x: " + x);

                if(y == cell.y && x == cell.x)
                {
                    continue;
                }

                var id = x + (y * Grid.width);
                //id--;
                console.log(id);

                
                if(y < Grid.hight 
                && x > 0 && x < Grid.width 
                //if(id >= Grid.size || id < 1)
                && id < Grid.size && id > 0)
                {
                    var newCell = Grid.getCellByID(id);
                    console.log(newCell.element.div);

                    newCell.element.div.className = speedClassNames[0];
                }
            }
            
            
            x -= speed + 1 + additionalOffset;

            
                //additionalOffset--;

            if(y >= cell.y)
            {
                width -= 2;
            }
            else
            {
                width += 2;
            }
        }
    },

    "moveHero" : function(cell)
    {
        if(cell.hero == null)
        {
            var selectedCell = Grid.getSelectedCell();

            Grid.initSelectedCell();

            DOM.createInnerHTML(cell.element.heroName, selectedCell.hero.name);
            cell.element.heroName.className = "h1-" + this.players[this.currentPlayer].cssName;

            DOM.createInnerHTML(cell.element.heroHealth, selectedCell.hero.health);

            Grid.setHeroToCell(cell.element.id, selectedCell.hero);

            this.actionType--;

            this.nextPlayerTurn();
        }
    },

    "displayHeroInfo" : function(hero)
    {
        DOM.createInnerHTML(selectedHeroName, hero.name);
    },

    "setActionInfo" : function()
    {
        DOM.createInnerHTML(currentPlayerHeading, this.players[this.currentPlayer].name);
    },

    "init" : function()
    {
        this.currentPlayer = 0;
    },

    "canPlace" : function(cell)
    {
        //Battlefield
        if(cell.y > 1 && cell.y < 5)
        {
            DOM.createInnerHTML(message, messageCollection[1]);
            return false;
        }

        //Player A and Player B
        if(this.currentPlayer == 0 && cell.y < 2 
        || this.currentPlayer == 1 && cell.y > 4)
        {
            DOM.createInnerHTML(message, messageCollection[0]);
            return true;
        }
        else
        {
            DOM.createInnerHTML(message, messageCollection[2]);
            return false;
        }
    },

    "nextPlayerTurn" : function()
    {
        if(this.currentPlayer == 0)
            this.currentPlayer = 1;
        else
            this.currentPlayer = 0

        DOM.createInnerHTML(currentPlayerHeading, this.players[this.currentPlayer].name);
    }
}