function Element(div, heroName, heroHealth)
{
    this.id = div.id.substring(4) - 1;
    this.div = div;
    this.heroName = heroName;
    this.heroHealth = heroHealth;
}