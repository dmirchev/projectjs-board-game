var parentName = "game-heading-holder";
var currentPlayer;

function Heading()
{
    var parent = DOM.getElementByID(parentName);

    currentPlayer = DOM.createElementByTag("h1", "player", "info-heading", parent.id);
}