var ClickToHighlight = pc.createScript('clickToHighlight');


// initialize code called once per entity
ClickToHighlight.prototype.initialize = function() {

    // --- variables
    this.cameraEntity = this.entity;
    this.previous = undefined;
    this.interval = 0;
    
    // Add touch event only if touch is available
    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.touchStart, this);
    }
    else{    
        // Add a mousedown event handler
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.mouseDown, this);        
    }
};

ClickToHighlight.prototype.update = function(dt) {
    if (this.interval > 0) {
        this.interval -= 1;
    }
};

ClickToHighlight.prototype.setInterval = function() {
    this.interval = 15; 
};


ClickToHighlight.prototype.mouseDown = function (e) {
    if (e.button == 2) {
        this.doRaycast(e);  
    }
};

ClickToHighlight.prototype.touchStart = function (e) {
    // Only perform the raycast if there is one finger on the screen
    if (e.touches.length == 1) {
        if (this.interval > 0) {
            this.doRaycast(e.touches[0]);  
        }
        else{
           this.setInterval();
        }
        
    }
    e.event.preventDefault();
};

ClickToHighlight.prototype.doRaycast = function (screenPosition) {
    // The vec3 to raycast from
    var from = this.cameraEntity.getPosition();
    // The vec3 to raycast to 
    var to = this.cameraEntity.camera.screenToWorld(screenPosition.x, screenPosition.y, this.cameraEntity.camera.farClip*100);

    // Raycast between the two points
    var results = this.app.systems.rigidbody.raycastAll(from, to);
    
    var result = null;
    
    var dist = 1000;
    for(var i in results){
        if (results[i].entity.tags.has('no-select') === false){
            if (results[i].entity.getPosition().distance(this.cameraEntity.getPosition()) < dist){
                result = results[i];
                dist = results[i].entity.getPosition().distance(this.cameraEntity.getPosition());
            }   
        }
    }
    
    // If there was a hit, store the entity
    if (result && result.entity && result.entity.script) {   
        this.focusEntity(result.entity);       
    }
    else{
        
        if(this.previous){
            this.app.fire('Ermis:objectOutline:remove', this.previous);
            for (var e in this.previous.children){
                this.app.fire('Ermis:objectOutline:remove', this.previous.children[e]); 
            }

            this.app.root.findByName('UI').script.ui.displayObject(null);
            this.entity.script.orbitCamera.reset(this.entity.script.orbitCamera.yaw,-90,80);
            this.previous = undefined;
        }        
    }
};


ClickToHighlight.prototype.focusEntity = function (entity) {
    
    // If there was a hit, store the entity 
        if (this.app.root.findByTag("no-select").indexOf(entity) > -1) {
            if(this.previous){
                this.app.fire('Ermis:objectOutline:remove', this.previous);
                for (var a in this.previous.children){
                    this.app.fire('Ermis:objectOutline:remove', this.previous.children[a]); 
                }

                this.app.root.findByName('UI').script.ui.displayObject(null);
                this.entity.script.orbitCamera.reset(this.entity.script.orbitCamera.yaw,-90,80);
                this.previous = undefined;
            }   
        }
        else {

            this.app.fire('Ermis:objectOutline:add', entity);
            for (var c in entity.children){
               this.app.fire('Ermis:objectOutline:add', entity.children[c]); 
            }
            
            this.entity.script.orbitCamera.focus(entity);
        
            if( this.previous && this.previous._guid !== entity._guid){
                this.app.fire('Ermis:objectOutline:remove', this.previous);
                for (var d in this.previous.children){
                    this.app.fire('Ermis:objectOutline:remove', this.previous.children[d]); 
                }
            }
            this.previous = entity;
            this.app.root.findByName('UI').script.ui.displayObject(entity);
        }
    
};