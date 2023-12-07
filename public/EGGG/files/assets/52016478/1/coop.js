var Coop = pc.createScript('coop');
var tick = 0;
// initialize code called once per entity
Coop.prototype.initialize = function() {
    coins = this.loadWeb("coins");

    this.health = 100;
    if(!coins){
        this.tokens = 1000;
        this.storeWeb("coins", this.tokens);
    }
    else{
       this.tokens = coins; 
    }
    this.hens = 3;
    this.towersActive = [];
    this.entity.on('upgrade', this.checkUpgrades, this); 
    const msgParse = this.parseMessage.bind(this);
    if (window.addEventListener) {
    // For standards-compliant web browsers
        window.addEventListener("message", msgParse, false);
        console.log("EVT: message");
    }
    else {
        window.attachEvent("onmessage", msgParse);
        console.log("EVT: onmessage");
    }
};

Coop.prototype.parseMessage = function(evt) {
    var message;
    message = "I got " + evt.data + " from " + evt.origin;
    //document.getElementById("received-message").innerHTML = message;
    console.log({message, evt});
    if(evt.data.hasOwnProperty('coins')){
        this.tokens = evt.data.coins;
        console.log("coins: " + evt.data.coins);
    }
    console.log("tokens: " + this.tokens);
};

// update code called every frame
Coop.prototype.update = function(dt) {
    if(tick < 3){
        window.top.postMessage("Playcanvas_Ready", "*");
        tick+=1;
    }
    this.health = pc.math.clamp(this.health, 0, 100);
    if (this.health < 1 && this.hens > 0){
        this.health = 100;
        this.hens -= 1;
    }
};

Coop.prototype.tokenADD = function(amount) {
    this.tokens += amount;
    this.storeWeb("coins", this.tokens);
    window.top.postMessage({coins:tokens}, "*");
};

Coop.prototype.tokenSUB = function(amount) {
    this.tokens -= amount;
    this.storeWeb("coins", this.tokens);
    window.top.postMessage({coins:tokens}, "*");
};

Coop.prototype.loadWeb = function(item) {
    result = localStorage.getItem(item);
    console.log("Found: ");
    console.log(result);
    return result;
};

Coop.prototype.storeWeb = function(item, obj) {
    localStorage.setItem(item, obj);
};

Coop.prototype.checkUpgrades = function() {
    console.log(this.entity.script.tower.configMain.upgrades[1].owned);
    if (this.entity.script.tower.configMain.upgrades[1].owned == "bought"){
        this.entity.script.tower.configMain.upgrades[1].owned == "buy";
        this.hens += 1;
    }
};
// swap method called for script hot-reloading
// inherit your script state here
// Coop.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/