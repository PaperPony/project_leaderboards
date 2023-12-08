var FailUi = pc.createScript('fail-ui');

// initialize code called once per entity
FailUi.prototype.initialize = function() {
    this.entity.findByName('InstScreen').enabled = false;
    this.entity.findByName('TryAgainButton').element.on('click', function (event) {
        this.app.scenes.changeScene('Main');
        this.sound();
    }, this);  
};

// update code called every frame
FailUi.prototype.update = function(dt) {
    

};

FailUi.prototype.sound = function() {
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

