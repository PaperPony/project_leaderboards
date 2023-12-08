var Summoner = pc.createScript('summoner');

Summoner.attributes.add("asset_id", {type: "number"});
Summoner.attributes.add("cost", {type: "number"});
Summoner.attributes.add("name", {type: "string"});
Summoner.attributes.add("range", {type: "number"});
// initialize code called once per entity
Summoner.prototype.initialize = function() {
    this.canPlace = false;
    this.def = null;
    this.ray = new pc.Ray();
    this.cameraEntity = this.app.root.findByName('Camera');
    this.state = 'release';
    this.entity.element.on('click', function (event) {
        if(event.button === 0 && this.state == 'release'){
            if(this.state == 'release'){
                this.ready('init');
            }
        }
    }, this);
    this.entity.element.on('touchstart', function (event) {
        if(this.state == 'release'){
            this.ready('init');
        }
    }, this);
    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    
    if(this.app.touch){
    this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchMove, this);
    this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
    }

    this.entity.findByName('Cost').element.text = this.cost + " Tokens";
    this.entity.findByName('Text').element.text = this.name;
};

Summoner.prototype.onMouseMove = function(event) {
    if (this.state == 'dragging') {
        
    }
    else{
        this.app.root.findByName("Radius Previewer").setPosition(0,0,0);
        this.app.root.findByName("Radius Previewer").setLocalScale(1,1,1);
    }
};

Summoner.prototype.onMouseDown = function(event) {
    if (this.state == 'dragging') {
        if (event.button === 0) {
            this.doRayCast(event);
            this.ready('place');
        }
        else{
            this.kill();
            this.entity.button.active = true;
        }
    }
};

Summoner.prototype.onTouchMove = function(event) {
    if (event.touches.length == 1) {
        if (this.state == 'dragging' && this.canPlace == true) {
            this.doRayCast(event.touches[0]);
            this.ready('place');
            this.canPlace = false;
        }
    }
};

Summoner.prototype.onTouchEnd = function(event) {
    if (this.canPlace == false && this.state == 'dragging'){
        this.canPlace = true;
    }
};

Summoner.prototype.doRayCast = function (screenPosition) {
    // Initialise the ray and work out the direction of the ray from the a screen position
    var from = this.cameraEntity.getPosition();
    // The vec3 to raycast to 
    var to = this.cameraEntity.camera.screenToWorld(screenPosition.x, screenPosition.y, this.cameraEntity.camera.farClip);

    // Raycast between the two points
    var results = this.app.systems.rigidbody.raycastAll(from, to);
    var result = null;
    
    var dist = 1000;
    for(var i in results){
        if (results[i].entity.name == "Map" || results[i].entity.name == "No Zone"){
            if (results[i].entity.getPosition().y < dist){
                result = results[i];
                dist = results[i].entity.getPosition().y;
            } 
        }
    }
    
    if (result && this.def) {
        this.def.rigidbody.teleport(result.point.x, result.point.y+3, result.point.z);
        this.app.root.findByName('Radius Previewer').setPosition(this.def.getPosition().x, 10.8, this.def.getPosition().z);
        this.app.root.findByName('Radius Previewer').setLocalScale(this.range*2, 0.1, this.range*2);
        
        if(result.entity.name == "No Zone"){
            this.app.root.findByName('Radius Previewer').model.meshInstances[0].material = this.app.assets.get(52248028).resource;
            this.canPlace = false;
        }
        else{
            this.app.root.findByName('Radius Previewer').model.meshInstances[0].material = this.app.assets.get(52187915).resource;
            this.canPlace = true;
        }
    }  
};


// update code called every frame
Summoner.prototype.update = function(dt) {
    if(this.app.keyboard.wasPressed(pc.KEY_ESCAPE)){
        this.kill();
    }

};

Summoner.prototype.ready = function(mode) {
    var amount = this.app.root.findByName("Coop").script.coop.tokens;
    if(mode == 'init' && amount >= this.cost){        
        var templateAsset = this.app.assets.get(this.asset_id);
        this.def = templateAsset.resource.instantiate();
        this.app.root.addChild(this.def);
        this.def.setPosition(0, 0, -17);
        this.entity.button.active = false;
        this.state = 'dragging';
        
    }
    
    if(mode == 'place'){
        
        if (this.def && this.canPlace === true){ 
            this.def.script.enabled = true;
            for (var x in this.def.script.scripts){
                this.def.script.scripts[x].initialize();
            }
            this.state = 'release';
            this.app.root.findByName("Coop").script.coop.tokenSUB(this.cost);
            this.app.root.findByName("UI").sound.play("Slot 3");
            if (this.app.root.findByName("Coop").script.coop.towersActive.length < 1){
                this.cameraEntity.script.clickToHighlight.focusEntity(this.def); 
            }
            this.def.tags.add("Tower");
            this.app.root.findByName("Coop").script.coop.towersActive.push(this.app.root.findByGuid(this.def.getGuid()));
            this.def.recover = {asset_id: this.asset_id, name: this.name, range: this.range, cost: this.cost, position: JSON.stringify(this.def.getPosition()), upgrades: ""};
            this.def = null;
            this.entity.button.active = true;
        }
    }

};

Summoner.prototype.kill = function() {
    if(this.def){
        this.def.destroy();
        this.def = null;
        this.state = "release";
    }
};


// swap method called for script hot-reloading
// inherit your script state here
// Summoner.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/