var Main = pc.createScript('main');

Main.attributes.add("configFile", {type: "asset"});
// initialize code called once per entity
Main.prototype.initialize = function() {
    this.trigger = 0;
    this.active = false;
    if (this.configFile){
        this.config = JSON.parse(this.configFile.resources[0]);
    }
    this.index = 0;
    this.sp_ind = 0;
    this.round = this.config[0];
    this.cache = this.loadWeb("webstorage");
    this.app.root.findByName("UI").script.ui.pushMessage(this.round.num, this.round.description);
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
    
    this.storeWeb("webstorage", ["HIIIIII", "hello", "die die die", "Ryujin no ke wo kurae!!!"]);
};

Main.prototype.loadWeb = function(item) {
    result = localStorage.getItem(item);
    console.log("Found: ");
    console.log(result);
    return result;
};

Main.prototype.storeWeb = function(item, obj) {
    localStorage.setItem(item, obj);
};


Main.prototype.stop = function(round, message) {
    if(this.active === true){
        this.index += 1;
        this.round = this.config[this.index];
        if(this.round){
            this.app.root.findByName("UI").script.ui.pushMessage(this.round.num, this.round.description);
        }
        else{
            
        }
        this.active = false;
    }    
};

Main.prototype.start = function() {
    this.active = true;
    this.sp_ind = 0; 
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
// swap method called for script hot-reloading
// inherit your script state here
// Spawner.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/