var Tower = pc.createScript('tower');

Tower.attributes.add("config", {type: "asset"});

// initialize code called once per entity
Tower.prototype.initialize = function() {
    if (this.config){
        this.configMain = JSON.parse(this.config.resources[0]);
    }
    this.fireRate = 1; 
    this.radius = 1;
    this.damage = 1;
    this.engageList = [];
    this.exclusionTags = [];
    this.inclusionTags = ['enemy'];
    this.engaged = false;
    this.killCount = 0;
    
    
    this.entity.children[0].collision.on('triggerenter',                  
        function(entity) {this.enemyPush(entity);}, this);
    this.entity.children[0].collision.on('triggerleave',                  
        function(entity) {this.enemyPop(entity);}, this);
    
    this.entity.on('killCount', this.killTick, this);
};

Tower.prototype.setUp = function(obj) {
    this.fireRate = obj.fireRate; 
    this.radius = obj.radius;
    this.damage = obj.damage;
};

Tower.prototype.killTick = function() {
    this.killCount += 1;
};

// update code called every frame
Tower.prototype.update = function(dt) {
    if(this.entity.findByName('Radius')){
        this.entity.findByName('Radius').collision.radius = this.radius;
        this.entity.findByName('Radius').setLocalScale(this.radius*2, 0, this.radius*2);
    }
};

Tower.prototype.enemyPush = function(entity) {    
    if(this.entity.name == 'Coop'){
        if (this.inclusionTags.filter(x => entity.tags.has(x)).length > 0) {
            this.entity.script.coop.health = pc.math.clamp(this.entity.script.coop.health - entity.script.enemyProto.harm, 0, 100);
            entity.destroy();
        }
    }
    else{
    if (this.inclusionTags.filter(x => entity.tags.has(x)).length > 0) {
        if (this.exclusionTags.filter(x => entity.tags.has(x)).length < 1) {
           this.engageList.push(entity); 
        }
    }
    }
};

Tower.prototype.enemyPop = function(entity) {
    if (this.engageList.indexOf(entity) > -1){
        this.engageList.splice(this.engageList.indexOf(entity), 1);
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// T.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/