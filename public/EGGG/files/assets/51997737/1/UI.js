var Ui = pc.createScript('ui');

// initialize code called once per entity
Ui.prototype.initialize = function() {
    
    this.set = [];
    this.config = null;
    this.focusEntity = null;
    this.listUp = true;
        
    for (var i in this.entity.children) {
    this.entity.children[i].element.on('mouseenter', function (event) {
        this.app.root.findByName('Camera').script.mouseInput.sceneOrbit = false;
    }, this);
    this.entity.children[i].element.on('mouseleave', function (event) {
        this.app.root.findByName('Camera').script.mouseInput.sceneOrbit = true;
    }, this);
    this.entity.children[i].element.on('touchstart', function (event) {
        this.app.root.findByName('Camera').script.touchInput.sceneOrbit = false;
    }, this);
    this.entity.children[i].element.on('touchend', function (event) {
        this.app.root.findByName('Camera').script.touchInput.sceneOrbit = true;
    }, this);
    }
    
    this.entity.findByName('Start Button').element.on('click', function (event) {
        this.entity.findByName('Message Group').enabled = false;
        this.app.root.findByName('Spawner').script.main.start();
    }, this);
    
    this.populate();
    
    this.entity.findByName('Arrow').element.on('click', function (event) {
        this.entity.findByName('Arrow').rotateLocal(0, 0, 180);
        if(this.listUp === true){
            this.entity.findByName('Tower Group').translateLocal(0, -400, 0);
            this.listUp = false;
        }
        else{
            this.entity.findByName('Tower Group').translateLocal(0, 400, 0);
            this.listUp = true;
        }
    }, this);
    
    this.entity.findByName('Sell Button').element.on('click', function (event) {
        if(this.focusEntity && this.config){
            var ind = this.app.root.findByName("Coop").script.coop.towersActive.indexOf(this.focusEntity);
            this.entity.sound.play("Slot 2");
            this.app.root.findByName('Coop').script.coop.tokenADD(this.config.sellBack);
            this.app.root.findByName("Coop").script.coop.towersActive.splice(ind, 1);
            this.focusEntity.destroy();
            this.focusEntity = null;
            this.config = null;
        }
    }, this);
};

// update code called every frame
Ui.prototype.update = function(dt) {
    if(this.focusEntity === null){
        this.entity.findByName('Info Group').enabled = false;
        this.app.root.findByName('RadiusViewer').setPosition(0,4,0);
        this.app.root.findByName('RadiusViewer').setLocalScale(1,1,1);
    }
    else{
        this.entity.findByName('Info Group').enabled = true;
        if(this.focusEntity.findByName('Radius')){
            this.app.root.findByName('RadiusViewer').setPosition(this.focusEntity.getPosition().x, 10.7, this.focusEntity.getPosition().z);
            this.app.root.findByName('RadiusViewer').setLocalScale(this.focusEntity.script.tower.radius*2, 0.1, this.focusEntity.script.tower.radius*2);
        }
        else{
            this.app.root.findByName('RadiusViewer').setPosition(0,4,0);
            this.app.root.findByName('RadiusViewer').setLocalScale(1,1,1);
        }
    }
    this.entity.findByName('Tokens').element.text = "Coins: " + this.app.root.findByName('Coop').script.coop.tokens;
    this.entity.findByName('Health Bar').element.width = (this.app.root.findByName('Coop').script.coop.health/100) * 390;
    this.hen(this.app.root.findByName('Coop').script.coop.hens);

    if (this.config){
        if(this.config.canSell === true){
            this.entity.findByName('Info Card').enabled = true;
            this.entity.findByName('SellBack').element.text = this.config.sellBack + " Coins";
        }
        else{
            this.entity.findByName('Info Card').enabled = false;
        }
    }
};


Ui.prototype.hen = function(number) {
    this.entity.findByName('HenCount').element.text = number + " Hens";
};

Ui.prototype.displayObject = function(object) {
    
    this.focusEntity = object;
    
    if(object && object.script){
        this.config = this.focusEntity.script.tower.configMain;
        for (var e in this.set){
            if (e < this.config.upgrades.length){
                if (this.config.upgrades[e].owned == "buy"){
                    this.set[e].findByName('Status').element.text = "BUY";
                    this.set[e].button.active = true;
                }
                else if (this.config.upgrades[e].owned === true){
                    this.set[e].findByName('Status').element.text = "OWNED";
                    this.set[e].button.active = false;
                }
                else if (this.config.upgrades[e].owned == "exc"){
                    this.set[e].findByName('Status').element.text = "LOCKED";
                    this.set[e].button.inactiveTint = new pc.Color(0.55, 0.55, 0.55);
                    this.set[e].button.active = false;
                }
                else if (this.config.upgrades[e].owned === false){
                    this.set[e].findByName('Status').element.text = "UPGRADE";
                    this.set[e].button.inactiveTint = new pc.Color(0.6, 0.86, 0.65);
                    this.set[e].button.active = true;
                }
                
                if (this.config.upgrades[e].linkList){
                    this.set[e].findByName('Link').enabled = true;
                }
                else{
                    this.set[e].findByName('Link').enabled = false;
                }
                this.set[e].enabled = true;
                this.set[e].findByName('Name').element.text = this.config.upgrades[e].name;
                this.set[e].findByName('Description').element.text = this.config.upgrades[e].description;
                this.set[e].findByName('Cost').element.text = this.config.upgrades[e].cost + " Coins";
            }
            else{
                this.set[e].enabled = false;
            }
            
        }
        this.entity.findByName('Title').element.text = this.config.name;
        
    }
};

Ui.prototype.populate = function() {
    var main = this.entity.findByName('Upgrade Card');
    
    this.set.push(main);
    
    var onPlayerMove = function(index) {
        console.log(x);
    };
    
    for (var x = 1; x < 10; x++){
        var y = main.clone();
        this.set.push(y);
        this.entity.findByName('Content').addChild(y);
        y.translateLocal(0, -220*x, 0);
        y.element.on('click', function (event) {
        this.buttonEvent(event.element.entity);
        }, this);
    }
    
    main.element.on('click', function (event) {
        this.buttonEvent(event.element.entity);
        }, this);
};

Ui.prototype.buttonEvent = function(entity) {

    var cost = this.config.upgrades[this.set.indexOf(entity)].cost;
    var list = this.config.upgrades[this.set.indexOf(entity)].linkList;
    
    if (cost <= this.app.root.findByName('Coop').script.coop.tokens && entity.button.active === true){
        this.app.root.findByName('Coop').script.coop.tokenSUB(cost);
        
        if(entity.findByName('Status').element.text == "BUY"){
            this.config.upgrades[this.set.indexOf(entity)].owned = "bought";
        }
        else{
            entity.button.active = false;
            this.config.upgrades[this.set.indexOf(entity)].owned = true;
            entity.findByName('Status').element.text = "OWNED";
        
            if (list){
                for(var n in list){
                    this.config.upgrades[list[n]].owned = 'exc';
                    this.set[list[n]].findByName('Status').element.text = "LOCKED";
                    this.set[list[n]].button.inactiveTint = new pc.Color(0.55, 0.55, 0.55);
                    this.set[list[n]].button.active = false;
                }
            }
            this.config.sellBack += Math.floor(cost*0.5);
        }
        this.focusEntity.fire('upgrade');
        this.entity.sound.play("Slot 1");
    }
};

Ui.prototype.pushMessage = function(round, message) {
    this.entity.findByName('Message Group').enabled = true;
    this.entity.findByName('Round').element.text = "Round: " + round;
    this.entity.findByName('Message').element.text = message;
};
// swap method called for script hot-reloading
// inherit your script state here
// Ui.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/