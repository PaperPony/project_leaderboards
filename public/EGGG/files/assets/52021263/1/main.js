var Main = pc.createScript('main');

Main.attributes.add("configFile", {type: "asset"});
// initialize code called once per entity
Main.prototype.initialize = function() {
    this.trigger = 0;
    this.active = false;
    if (this.configFile){
        this.config = JSON.parse(this.configFile.resources[0]);
    }

    round = this.loadWeb("completedRounds");
    if (!round) {
        round = 0;
        this.storeWeb("completedRounds", round);
    }
    this.index = round;
    this.sp_ind = 0;
    this.round = this.config[this.index];
    this.cache = this.loadWeb("webstorage");
    this.app.root.findByName("UI").script.ui.pushMessage(this.round.num, this.round.description);
    this.recover();
};

Main.prototype.loadWeb = function (item) {
  result = localStorage.getItem(item);
  return result;
};

Main.prototype.storeWeb = function (item, obj) {
  localStorage.setItem(item, obj);
};


// update code called every frame
Main.prototype.update = function(dt) {
    
    if(this.active === true){
        if(this.round.spawns.length > this.sp_ind){
            if(this.trigger < 0){
                this.trigger = this.round.spawns[this.sp_ind].duration;
                
                if(this.round.spawns[this.sp_ind].amount == 1){
                this.spawn(this.round.spawns[this.sp_ind]);
                this.sp_ind += 1;
                }
                
                else{
                this.spawn(this.round.spawns[0]);
                this.round.spawns[this.sp_ind].amount -= 1;
                }
                
            }
            else{
                this.trigger -= dt;
            }
        }
        else if(this.round.spawns.length <= this.sp_ind && this.app.root.find('name', 'Enemy').length < 1){
            this.stop(this.round.num, this.round.description);
        }
    }
};

Main.prototype.loadWeb = function(item) {
    result = localStorage.getItem(item);
    return result;
};

Main.prototype.storeWeb = function(item, obj) {
    localStorage.setItem(item, obj);
};


Main.prototype.stop = function(round, message) {
    if(this.active === true){
        this.index = round;
        this.round = this.config[this.index];
        if(this.round){
            this.app.root.findByName("UI").script.ui.pushMessage(this.round.num, this.round.description);
        }
        else{
            console.log("ERROR", this.round, this.config, this.index);
        }
        this.storeWeb("completedRounds", round);
        this.saveState();
        this.active = false;
    }    
};

Main.prototype.start = function() {
    this.active = true;
    this.sp_ind = 0;
    console.log(this.minifyTowers());
    
};

Main.prototype.saveState = function() {
    activeTowers = this.app.root.findByName("Coop").script.coop.towersActive;
    this.storeWeb("currentTowers", JSON.stringify(this.minifyTowers()));
};


Main.prototype.spawn = function(spawn) {
    if (spawn.name !== 'wait'){
        for (var x in this.entity.children){
            var templateAsset = this.app.assets.get(52021162);
            var instance = templateAsset.resource.instantiate();
            instance.setPosition(this.entity.children[x].getPosition());
            instance.setEulerAngles(this.entity.children[x].getEulerAngles());
            instance.script.enemyProto.callName = spawn.name;
            this.app.root.addChild(instance);
            instance.enabled = true;
        }
    }
    
};

Main.prototype.placeTower = function(x) {   
    x.upgrades = JSON.parse(x.upgrades);
    x.position = JSON.parse(x.position);
    console.log(x); 

    var templateAsset = this.app.assets.get(x.asset_id);
    this.def = templateAsset.resource.instantiate();
    this.app.root.addChild(this.def);
    this.def.setPosition(x.position.x, 13, x.position.z);
    this.def.rigidbody.teleport(x.position.x, 13, x.position.z);
    
    this.def.script.enabled = true;
    for (var y in this.def.script.scripts){
        this.def.script.scripts[y].initialize();
    }
    this.def.tags.add("Tower");
    this.def.script.tower.configMain = x.upgrades; 
    this.def.fire('upgrade');
    this.def.recover = {asset_id: x.asset_id, name: x.name, range: x.range, cost: x.cost, position: JSON.stringify(this.def.getPosition()), upgrades: ""};
    this.app.root.findByName("Coop").script.coop.towersActive.push(this.app.root.findByGuid(this.def.getGuid()));
    this.def = null;
};


Main.prototype.recover = function() {
    load = this.loadWeb("currentTowers");
    if (load) {
        const placeFunc = this.placeTower.bind(this);
        towers = JSON.parse(load);
        towers.forEach(placeFunc);
    }
};


Main.prototype.minifyTowers = function() {
    var towers = this.app.root.findByTag("Tower");
    var list = [];
    
    if(towers){        
        towers.forEach(function (x) {
            x.recover.upgrades = JSON.stringify(x.script.tower.configMain);
            x.recover.position = JSON.stringify(x.getPosition());
            list.push(x.recover);
        });
    }
    return list;
};

// swap method called for script hot-reloading
// inherit your script state here
// Spawner.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/