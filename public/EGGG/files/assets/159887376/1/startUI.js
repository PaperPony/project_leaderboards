var StartUi = pc.createScript('start-ui');

// initialize code called once per entity
StartUi.prototype.initialize = function() {
    this.entity.findByName('InstScreen').enabled = false;

    this.entity.findByName('InstButton').element.on('click', function (event) {
        this.entity.findByName('InstScreen').enabled = true;
        this.sound();
    }, this);

    this.entity.findByName('BackButton').element.on('click', function (event) {
        this.entity.findByName('InstScreen').enabled = false;
        this.sound();
    }, this);

    this.entity.findByName('PlayButton').element.on('click', function (event) {
        this.app.scenes.changeScene('Main');
        this.sound();
    }, this);  
};

// update code called every frame
StartUi.prototype.update = function(dt) {
    

};

StartUi.prototype.sound = function() {
    
    if(!pc.SoundComponentSystem){
        pc.SoundComponentSystem = new SoundComponent(pc.SoundComponentSystem, this.app);
        pc.SoundComponentSystem.context = new AudioContext();
    }
    if(!pc.SoundComponentSystem.context){
        pc.SoundComponentSystem.context = new AudioContext();
    }
    pc.SoundComponentSystem.context.resume();
    this.AudioContext = pc.SoundComponentSystem.context;
};

