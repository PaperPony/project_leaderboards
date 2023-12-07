var Feather = pc.createScript('feather');

// initialize code called once per entity
Feather.prototype.initialize = function() {
    this.entity.collision.on('collisionstart', function (event) {
        this.hurt(event.other);
    }, this);
    this.damage = 0;
    this.initEntity = null;
    this.duration = 0.6;
    this.scale = 1;
    this.hitCount = 0;
    this.behavior = "none";
    this.rot = 30;
    this.dir = 1;
    this.limit = 0.4; 
};

// update code called every frame
Feather.prototype.update = function(dt) {
    this.entity.children[0].rotateLocal(0, this.rot*this.scale, 0);
    this.forceVal = this.entity.forward.clone().scale(this.scale);
    if (this.dir > 0){
       this.entity.rigidbody.teleport(this.entity.getPosition().add(this.forceVal));
    }
    else{
       this.entity.rigidbody.teleport(this.entity.getPosition().sub(this.forceVal)); 
    }
    
    
    if (this.duration < 0){
       this.entity.destroy();
    }
    else{
        if (this.duration < 0.1 && this.dir > 0 && this.behavior == "return"){
            this.duration = (this.limit * this.scale) + 0.1;
            this.dir = -1;
        } 
        if (this.duration < (this.limit * this.scale) && this.behavior == "fork"){
            this.behavior = "none";
            this.fireRound();
        }
        
        this.duration -= dt;
    }
    
};

Feather.prototype.hurt = function(result) {
    if(result && result.script && result.script.enemyProto){
        result.script.enemyProto.applyDamage(this.damage, this.initEntity);
        if(this.hitCount === 0){
            this.entity.destroy();
        }
    }   
  
};

Feather.prototype.fireRound = function() {
    var x = 2;
        var templateAsset = this.app.assets.get(52300348);
        var instance = templateAsset.resource.instantiate();
        instance.setPosition(this.entity.getPosition());
        instance.setEulerAngles(this.entity.getEulerAngles().x, (this.entity.getEulerAngles().y-20) + (x*20), this.entity.getEulerAngles().z);
        instance.translateLocal(0, -1, 0);
        this.app.root.addChild(instance);
        instance.children[0].model.meshInstances[0].material = this.entity.children[0].model.meshInstances[0].material;
        instance.script.feather.damage = this.damage;
        instance.script.feather.initEntity = this.initEntity;  
        instance.script.feather.scale = this.scale;  
        instance.script.feather.duration = this.duration;     
};

// swap method called for script hot-reloading
// inherit your script state here
// Feather.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/