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
  var photons;
  var flashlight;
  var metal;

  var game = new Phaser.Game(config);

  let vx = -8;
  let vy = 3;
  let hit = false;

  function preload ()
  {
    this.load.image('metal', 'images/metal.png');
    this.load.image('flashlight', 'images/flashlight.png');
    this.load.spritesheet('photon', 'images/photons.png', { frameWidth: 248, frameHeight: 112});
  }

  function create ()
  {
    metal = this.add.image(100, 298, 'metal');
    metal.setScale(0.4);

    flashlight = this.add.image(700, 80, 'flashlight');
    flashlight.setScale(0.2);
    flashlight.angle = 9;

    photon = this.add.image(700, 85, 'photon');
    photon.setScale(0.2);
    photon.y = 73;
    photon.x = 700;
    photon.angle = -20;
    photon.setFrame(4);

    photons = this.add.group({
        key: 'photon',
        repeat: 3,
        setXY: { x: 450, y: 100, stepX: 40 },
    });
    //photons.setScale(0.2);
    photons.y = 73;
    photons.x = 700;
    photons.angle = -20;
    //photons.setFrame(4);

    photons.children.iterate(function (child) {
        child.setScale(0.2);
        child.angle = -20;
        child.setFrame(4);
        child.y = 73;
        //child.x = 400;
    });

  }

  function update (t)
  {
    /*
    if (photons.x < 120) {
      vx *= -1;
      photons.angle *= -1;
    }
    photons.x += vx;
    photons.y += vy;
    */


    if (photon.x < 120) {
      vx *= -1;
      photon.angle *= -1;
    }
    photon.x += vx;
    photon.y += vy;
  }

});
