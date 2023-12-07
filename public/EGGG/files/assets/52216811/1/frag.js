var Frag = pc.createScript('frag');

// initialize code called once per entity
Frag.prototype.initialize = function() {
    this.damage = 0;
    this.endRadius = 0;
    this.currentRadius = 0.1;
    this.initEntity = null;
    this.entity.collision.on('triggerenter', function (event) {
        this.hurt(event);
    }, this);
    this.entity.collision.radius = 6;
    this.effect = null;
    
};

// update code called every frame
Frag.prototype.update = function(dt) {
    if(this.currentRadius > 6){
        this.entity.destroy();
    }
    else{
        this.currentRadius += 1.5;
        console.log(this.initEntity);
        this.entity.setLocalScale(this.currentRadius*2, this.currentRadius*2, this.currentRadius*2);
    }
};

Frag.prototype.hurt = function(result) {
    if(result && result.script && result.script.enemyProto){
        result.script.enemyProto.applyDamage(this.damage, this.initEntity);
        if(this.effect){
            result.script.enemyProto.applyEffect(this.effect, this.initEntity);
        }
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// Frag.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/