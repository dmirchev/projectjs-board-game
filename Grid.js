var gridElements = [];
var selectedCell = null;

var gridCounter = 0;


var rowClassCounter = 0;
var rowClassNames = ["player-a", "battlefield", "player-b"]

function GetNextCounter()
{
    return ++gridCounter;
}

//Get the Current Row from the For Loop
//And with %3 we will get the first 2 as Player-A / next 3 - Battlefield / Last (2)3 - Player-B
function GetNextRowType(currentRow)
{
    //If we compare with 0 it will return 0 and will add to the counter
    currentRow++;

    if(currentRow % 3 == 0)
        rowClassCounter++;
    
    return rowClassNames[rowClassCounter];
}

function GetRowType()
{
    return rowClassNames[rowClassCounter];
}

var Grid =
{
    "width" : 0,
    "hight" : 0,
    "size" : 0,
    "table" : null,
    "createGrid" : function(rows, columns)
    {
        this.table = DOM.getElementByID("game-board-table");

        this.width = rows;
        this.hight = columns;

        this.size = rows * columns;

        for(var y = 0; y < columns; y++)
        {
            DOM.createElementByTag("tr", y, "row-" + GetNextRowType(y), this.table.id);

            for(var x = 0; x < rows; x++)
            {
                var conter = GetNextCounter();

                //Background
                var background = DOM.createElementByTag("td", conter, GetRowType() + "-background", "tr-" + y);

                //Top Cell
                var div = DOM.createElementByTag("div", conter, "column-" + x, background.id);
                div.style.zIndex = y;

                var heroName = DOM.createElementByTag("h1", conter, "h1", div.id);
                var heroHealth = DOM.createElementByTag("h1", conter, "hero-health-full", div.id);

                var element = new Element(div, heroName, heroHealth);

                this.setEventListener(element);

                gridElements.push(new Cell(x, y, "column-" + x, element));
            }
        }

        this.placeObstacles();
    },

    "placeObstacles" : function()
    {
        numberOfObstacles = getRndInteger(1, 5);

        for(var i = 0; i <= numberOfObstacles; i++)
        {
            var cellID = getRndInteger(18, 45);
            var cell = gridElements[cellID];

            cell.obstacle = true;
            gridElements[cellID].element.div.className = "obstacle";
            DOM.createInnerHTML(cell.element.heroName, "X");
        }
    },

    "setEventListener" : function(element)
    {
        element.div.addEventListener('click', function()
        {
            var cell = gridElements[element.id];
            
            if(ActionManager.actionType == 0)
            {
                ActionManager.placeHero(cell);
            }
            else if(ActionManager.actionType == 1)
            {
                selectedCell = cell;
                ActionManager.selectHero(cell);
            }
            else if(ActionManager.actionType == 2)
            {
                ActionManager.moveHero(cell);
            }
        });
    },

    "getCellByID" : function(id)
    {
        return gridElements[id];
    },

    "setHeroToCell" : function(id, hero)
    {
        gridElements[id].hero = hero;
    },

    "getSelectedCell" : function()
    {
        if(selectedCell != null)
        {
            return selectedCell;
        }
    },

    "initSelectedCell" : function()
    {
        DOM.createInnerHTML(selectedCell.element.heroName, "");
        selectedCell.element.heroName.className = "h1";

        DOM.createInnerHTML(selectedCell.element.heroHealth, "");

        selectedCell = null;
    }
}

//function Cell(x, y, element, defaultClass, eventElement = null)
function Cell(x, y, defaultClass, element)
{
    this.x = x;
    this.y = y;

    this.hero = null;
    this.obstacle = false;

    this.defaultClass = defaultClass;

    this.element = element;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}