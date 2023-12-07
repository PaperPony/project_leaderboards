var Turret = pc.createScript('turret');


// initialize code called once per entity
Turret.prototype.initialize = function() {
    this.fireTime = 0;
    this.bulletTime = 0;
    this.bullet = [];
    this.entity.children[1].animation.play("Turret(Base) Idle");
    this.entity.children[1].animation.loop = true;
    this.entity.on('upgrade', this.checkUpgrades, this);
    this.entity.script.tower.setUp({fireRate: 5, radius: 25, damage: 36});
    
    this.memento = -1;
};

// update code called every frame
Turret.prototype.update = function(dt) {
    var startColor = new pc.Color(1, 1, 1);
    var endColor = new pc.Color(1, 1, 1);
    
    if (this.fireTime < 0){
        if (this.entity.script.tower.engageList.length > 0) {
            
            this.entity.script.tower.engaged = true;
            var pos = this.entity.script.tower.engageList[this.entity.script.tower.engageList.length-1].getLocalPosition();
            this.entity.children[1].lookAt(pos.x, pos.y, pos.z); 
            this.entity.children[1].animation.play("Turret(Base) Fire");
            this.entity.sound.play("Slot 1");
            this.bullet = this.fireRound();
  
            if(this.memento >= 1){
                if(this.memento == 1){
                    this.entity.children[1].model.meshInstances[1].material = this.app.assets.get(51881129).resource;
                }
                this.entity.sound.play("Slot 2");
                this.memento -= 1;
            }
            if(this.memento > -1 && this.memento < 1){this.memento -= 0.5;}

            this.bulletTime = 0.2;
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
    
    if (this.bulletTime > 0){
        endColor.a = this.bulletTime / 0.2;
        startColor.a = (this.bulletTime / 0.2)-2;
        this.app.renderLine(this.bullet[0], this.bullet[1], startColor, endColor);
        this.bulletTime -= dt;
    }
        
    
};


Turret.prototype.fireRound = function() {
    if (this.accelerometer){
        this.entity.script.tower.fireRate = pc.math.clamp(this.entity.script.tower.fireRate+0.2, this.accelerometer.base, this.accelerometer.max);
    }
    
    var boost = 1;
    
    if (this.memento > 0){
        boost = 4;
    }
    
    var from = this.entity.children[1].getPosition();
    var to = new pc.Vec3();
    to.add2(from, this.entity.children[1].children[0].forward.mulScalar(this.entity.script.tower.radius+10));

    var results = this.app.systems.rigidbody.raycastAll(from, to);
    
    for (var x in results){
        var result = results[x];
        if (result &&  result.entity && result.entity.tags.has('shield')){
            return([this.entity.children[1].children[0].getPosition(), result.entity.getPosition(), false]);
        }
        if (result &&  result.entity.script && result.entity.script.enemyProto){
            if(this.frag){
                var templateAsset = this.app.assets.get(52218912);
                var inst = templateAsset.resource.instantiate();
                this.app.root.addChild(inst);
                inst.script.enabled = true;
                inst.setPosition(result.entity.getPosition());
                inst.script.frag.damage = this.entity.script.tower.damage * boost;
                inst.script.frag.initEntity = this.entity;
                inst.script.frag.endRadius = 8;
                inst.script.frag.effect = this.debuff;
            }
            else{
                result.entity.script.enemyProto.applyDamage(this.entity.script.tower.damage * boost, this.entity);
                if(this.debuff){
                    result.entity.script.enemyProto.applyEffect(this.debuff, this.entity);
                }
            }
            
            
            return([this.entity.children[1].children[0].getPosition(), result.entity.getPosition(), true]);
        }            
    }
    return([this.entity.children[1].children[0].getPosition(), to, false]);
};

Turret.prototype.resetFire = function() {
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
        this.entity.children[1].animation.play("Turret(Base) Idle");
        this.fireTime = 0;
    }

};

Turret.prototype.checkUpgrades = function() {
    
    if (this.entity.script.tower.configMain.upgrades[3].owned === true){
        this.entity.children[1].model.asset = this.app.assets.get(52213615);
        this.entity.children[1].model.meshInstances[2].material = this.app.assets.get(52214683).resource;
        this.debuff = {name: 'rot', duration: 3};
    }
    if (this.entity.script.tower.configMain.upgrades[4].owned === true){
        this.entity.children[1].model.asset = this.app.assets.get(52213615);
        this.entity.children[1].model.meshInstances[2].material = this.app.assets.get(52216470).resource;
        this.debuff = {name: 'slow', duration: 2};
    }
    if (this.entity.script.tower.configMain.upgrades[5].owned === true){
        this.entity.children[1].model.asset = this.app.assets.get(52213615);
        this.entity.children[1].model.meshInstances[2].material = this.app.assets.get(52214437).resource;
        this.entity.on('killCount', this.memMori, this);
    }
    
    if (this.entity.script.tower.configMain.upgrades[0].owned === true){
        this.entity.children[1].model.meshInstances[4].material = this.app.assets.get(52216574).resource;
        this.entity.script.tower.radius = 40;
    }
    if (this.entity.script.tower.configMain.upgrades[1].owned === true){
        this.entity.children[1].model.meshInstances[5].material = this.app.assets.get(51982608).resource;
        this.accelerometer = {base: 5.5, max: 10};
    }
    if (this.entity.script.tower.configMain.upgrades[2].owned === true){
        this.entity.children[1].model.meshInstances[6].material = this.app.assets.get(51881129).resource;
        this.frag = true;
    }

};

Turret.prototype.memMori = function() {
    if(this.memento === -1){
        this.entity.children[1].model.meshInstances[1].material = this.app.assets.get(52276431).resource;
        this.memento = 6;
    }
};



// swap method called for script hot-reloading
// inherit your script state here
// TurretEngage.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/

// initialize code called once per entity
