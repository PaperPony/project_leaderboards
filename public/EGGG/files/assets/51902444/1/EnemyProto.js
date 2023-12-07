var EnemyProto = pc.createScript('enemyProto');

EnemyProto.attributes.add("class", {type: "string"});
EnemyProto.attributes.add("callName", {type: "string"});

EnemyProto.attributes.add("speed", {type: "number", default: 50});
EnemyProto.attributes.add("harm", {type: "number", default: 5});

EnemyProto.attributes.add("defense", {type: "number", default: 0});
EnemyProto.attributes.add("immunities", {type: "string", array: true});

EnemyProto.attributes.add("worth", {type: "number", default: 20});

EnemyProto.attributes.add("configFile", {type: "asset"});

// initialize code called once per entity
EnemyProto.prototype.initialize = function() {
    if (this.configFile){
        this.config = JSON.parse(this.configFile.resources[0]);
    }
    
    this.damagedInterval = 0;
    this.force = new pc.Vec3();
    this.damagedBy = null;
    this.health = 100;

    this.entity.findByName('Core').collision.on('contact', this.contact, this);
    this.effects = {slow: 0, rot: 0};
    
    this.init(this.callName);
    
};

//Update the enemy's properties
EnemyProto.prototype.init = function(property) {  
    if (this.config[property]){
        var info = this.config[property];
        
        this.initProto(info.proto);
        
        this.class = info.class;
        
        this.speed = info.speed;
        this.harm = info.harm;
        
        this.defense = info.defense;
        this.immunities = info.immunities;
        
        this.worth = info.worth;
        
        if(info.splitter){
            this.entity.on("death", function (){
                this.splitter(info.splitter, info.proto.height);
            }, this);
        }
    }
};

//Update the enemy's look
EnemyProto.prototype.initProto = function(proto) {
    this.entity.collision.halfExtents = new pc.Vec3(proto.boundingBox.x, proto.boundingBox.y, proto.boundingBox.z);
    var dist = this.entity.up.clone().scale(proto.height);
    this.entity.rigidbody.teleport(this.entity.getPosition().add(dist));
    this.entity.findByName("Core").rigidbody.teleport(this.entity.getPosition().sub(dist));
    this.entity.findByName("Group").translateLocal(0, proto.uiOffset, 0);
    
    this.entity.findByName("Entity").model.asset = this.app.assets.get(proto.model);
    for (var x of proto.matOverrides){
        this.entity.findByName("Entity").model.meshInstances[x[0]].material = this.app.assets.get(x[1]).resource;
    }
    
    this.entity.findByName("Entity").animation.animations = {"Movement": this.app.assets.get(proto.anim).resource};
    
    if(proto.animSpeed){
        this.entity.findByName("Entity").animation.speed = proto.animSpeed;
    }
    
};

    
EnemyProto.prototype.initProto2 = function(proto) {
    this.entity.collision.halfExtents = new pc.Vec3(proto.boundingBox.x, proto.boundingBox.y, proto.boundingBox.z);
    var dist = this.entity.up.clone().scale(proto.height);
    this.entity.rigidbody.teleport(this.entity.getPosition().add(dist));
    this.entity.findByName("Core").rigidbody.teleport(this.entity.getPosition().sub(dist));
    this.entity.findByName("Group").translateLocal(0, proto.uiOffset, 0);
    
    this.entity.findByName("Entity").model.asset = this.app.assets.get(proto.model);
    for (var x of proto.matOverrides){
        this.entity.findByName("Entity").model.meshInstances[x[0]].material = this.app.assets.get(x[1]).resource;
    }
    
    this.entity.findByName("Entity").animation.animations = {"Movement": this.app.assets.get(proto.anim).resource};
    
    if(proto.animSpeed){
        this.entity.findByName("Entity").animation.speed = proto.animSpeed;
    }
    
};


// update code called every frame
EnemyProto.prototype.update = function(dt) {
    this.health = pc.math.clamp(this.health, 0, 100);
    var target = this.app.root.findByName('Coop').getPosition();
    this.entity.findByName('Group').lookAt(this.app.root.findByName('Camera').getPosition());
    
    var speed = this.speed;
    if (this.effects.slow > 0){
        speed /= 2.4;
    } 
    
    this.forceVal = this.entity.forward.clone().scale(speed/100);
    this.entity.rigidbody.teleport(this.entity.getPosition().add(this.forceVal));
    
    this.entity.findByName('Progress').element.width = (this.health/100)*3;
    
    for (var property in this.effects) {
        if(this.effects[property] > 0){this.effects[property] -= dt;}
    }
       
    if (this.health < 1){
        this.app.root.findByName('Coop').script.coop.tokenADD(this.worth);
        this.end();
    }
    
    if (this.effects.rot > 0){
        this.health -= 0.3;
    }
     
};



EnemyProto.prototype.applyDamage = function(amount, entity) {
    this.damagedInterval = 0.1;
    this.health -= amount - (amount*(this.defense/100));
    this.damagedBy = entity;

};

EnemyProto.prototype.end = function() {
    if(this.damagedBy){this.damagedBy.fire('killCount');}
    this.entity.fire("death");
    this.entity.destroy();
};

EnemyProto.prototype.applyEffect = function(effect, entity) {
    this.damagedBy = entity;
    if (effect.name == 'slow'){
        this.effects.slow = effect.duration;
    }
    if (effect.name == 'rot'){
        this.effects.rot = effect.duration;
    }

};

EnemyProto.prototype.contact = function(entity) {
    if(entity.other.name == 'Guide'){
        this.entity.rigidbody.teleport(this.entity.getPosition(), entity.other.getEulerAngles());
        this.entity.findByName('Group').lookAt(this.app.root.findByName('Camera').getPosition());
    }

};

EnemyProto.prototype.splitter = function(splitter, height) {
    for (var x  = 0; x < splitter.amount; x++){
        var templateAsset = this.app.assets.get(52021162);
        var instance = templateAsset.resource.instantiate();
        instance.setPosition(this.entity.getPosition());
        instance.setEulerAngles(this.entity.getEulerAngles());
        instance.translateLocal(0, -height, (splitter.distance*x));
        instance.script.enemyProto.callName = splitter.callName;
        this.app.root.addChild(instance);
        instance.enabled = true;
    }

};

// swap method called for script hot-reloading
// inherit your script state here
// EnemyProto.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/