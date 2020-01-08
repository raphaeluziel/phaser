document.addEventListener('DOMContentLoaded', function(){
  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var photon;
  var flashlight;
  var metal;

  var game = new Phaser.Game(config);

  let vx = -16;
  let vy = 6;
  let hit = false;

  function preload ()
  {
    this.load.image('metal', 'images/metal.png');
    this.load.image('flashlight', 'images/flashlight.png');
    this.load.spritesheet('photon', 'images/photons.png', { frameWidth: 248, frameHeight: 112});
  }

  function create ()
  {
    metal = this.add.image(400, 300, 'metal');
    metal.setScale(0.4);
    metal.x = 100;

    flashlight = this.add.image(400, 300, 'flashlight');
    flashlight.setScale(0.2);
    flashlight.y = 100;
    flashlight.x = 700;
    flashlight.angle = 3;

    photon = this.add.image(400, 300, 'photon');
    photon.setScale(0.2);
    photon.y = 93;
    photon.x = 700;
    photon.angle = -30;
  }

  function update ()
  {
    //photon.x += vx;
    //photon.y += vy;
  }

});
