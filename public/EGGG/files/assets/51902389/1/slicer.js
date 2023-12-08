var Slicer = pc.createScript('slicer');


// initialize code called once per entity
Slicer.prototype.initialize = function() {
    this.fireTime = 0;
    this.bullet = [];
    this.entity.children[1].animation.play("Slicer Idle");
    this.entity.children[1].animation.loop = true;
    this.entity.on('upgrade', this.checkUpgrades, this);
    this.entity.script.tower.setUp({fireRate: 0.75, radius: 40, damage: 120});
    this.fthr = "none";
    
};

// update code called every frame
Slicer.prototype.update = function(dt) {
    var startColor = new pc.Color(1, 1, 1);
    var endColor = new pc.Color(1, 1, 1);
    
    if (this.fireTime < 0){
        if (this.entity.script.tower.engageList.length > 0) {
            
            this.entity.script.tower.engaged = true;
            var pos = this.entity.script.tower.engageList[this.entity.script.tower.engageList.length-1].getLocalPosition();
            this.entity.children[1].lookAt(pos.x, this.entity.getLocalPosition().y-1, pos.z); 
            this.entity.children[1].animation.play("Slicer Fire");
            this.entity.sound.play("Slot 1");
            this.bullet = this.fireRound();
            this.resetFire();
        }
        
        else{
        if (this.entity.script.tower.engaged === true){
            this.entity.script.tower.engaged = false;
            this.resetFire();
            }
        }
    }
    
    else{
        this.fireTime -= dt;
    }
    
    
};


Slicer.prototype.fireRound = function() {
   for (var x = 1; x < 4; x++)
    {
        var templateAsset = this.app.assets.get(52300348);
        var instance = templateAsset.resource.instantiate();
        instance.setPosition(this.entity.findByName('Target').getPosition());
        instance.setEulerAngles(this.entity.findByName('Target').getEulerAngles().x, (this.entity.findByName('Target').getEulerAngles().y-20) + (x*20), this.entity.findByName('Target').getEulerAngles().z);
        instance.translateLocal(0, -1, 0);
        this.app.root.addChild(instance);
        if(this.pierce){
            instance.children[0].model.meshInstances[0].material = this.app.assets.get(52214437).resource;
            instance.script.feather.hitCount = 1;
        }
        instance.script.feather.damage = this.entity.script.tower.damage;
        instance.script.feather.initEntity = this.entity;
        instance.script.feather.behavior = this.fthr;
        if(this.farther){
            instance.script.feather.scale = 1.7;
            instance.script.feather.duration = 0.9;
            this.limit = 0.7; 
        }
        
    }
};

Slicer.prototype.resetFire = function() {
    if (this.entity.script.tower.engaged === true){
        this.entity.children[1].animation.speed = this.entity.script.tower.fireRate;
        this.entity.children[1].animation.loop = false;
        this.fireTime = this.entity.children[1].animation.duration / this.entity.script.tower.fireRate;
    }
    if (this.entity.script.tower.engaged === false){
        if (this.accelerometer){
            this.entity.script.tower.fireRate = this.accelerometer.base;
        }
        this.entity.children[1].animation.speed = 1;
        this.entity.children[1].animation.loop = true;
        this.entity.children[1].animation.play("Slicer Idle");
        this.fireTime = 0;
    }

};

Slicer.prototype.checkUpgrades = function() {
    
    if (this.entity.script.tower.configMain.upgrades[3].owned === true){
        this.entity.children[1].model.asset = this.app.assets.get(64966459);
        this.entity.children[1].model.meshInstances[1].material = this.app.assets.get(52248429).resource;
        this.fthr = "return";
    }
    if (this.entity.script.tower.configMain.upgrades[4].owned === true){
        this.entity.children[1].model.asset = this.app.assets.get(64966459);
        this.entity.children[1].model.meshInstances[1].material = this.app.assets.get(52214437).resource;
        this.fthr = "fork";
    }
    
    if (this.entity.script.tower.configMain.upgrades[0].owned === true){
        this.entity.children[1].model.meshInstances[4].material = this.app.assets.get(52216574).resource;
        this.entity.script.tower.fireRate = 1.3;
    }
    if (this.entity.script.tower.configMain.upgrades[1].owned === true){
        this.entity.children[1].model.meshInstances[5].material = this.app.assets.get(52291372).resource;
        this.farther = true;
    }
    if (this.entity.script.tower.configMain.upgrades[2].owned === true){
        this.entity.children[1].model.meshInstances[6].material = this.app.assets.get(51881129).resource;
        this.pierce = true;
    }

};






// swap method called for script hot-reloading
// inherit your script state here
// SlicerEngage.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/

// initialize code called once per entity
