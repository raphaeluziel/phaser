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

  var game = new Phaser.Game(config);

  let vx = -200;
  let vy = 120;
  let hit = false;

  function preload ()
  {
    this.add.image(400, 300, '/images/metal.png');
    this.load.spritesheet('photon', 'images/photons.png', { frameWidth: 248, frameHeight: 112});
  }

  function create ()
  {
    // The metal
    metal = this.physics.add.staticGroup();
    metal.create(200, 400, 'metal').setScale(0.5).refreshBody();

    // My photons
    photon = this.physics.add.sprite(650, 100, 'photon');
    photon.setGravityY(-300);
    photon.setScale(0.2);
    photon.angle = -30;

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    var photons = this.physics.add.group({
        key: 'photon',
        repeat: 8,
        setXY: { x: 450, y: 100, stepX: 30 },
    });

    photons.setVelocityX(vx);
    photons.setVelocityY(vy);

    photons.children.iterate(function (child) {

        //  Give each photon a different ???????
        child.setScale(0.2);
        child.angle = -30;
        child.setGravityY(-300);


    });

    // photon
    this.anims.create({
        key: 'hell',
        frames: [ { key: 'photon', frame: 0 } ],
        frameRate: 20
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

  }

  function update ()
  {
    if (photon.x < 215 && !hit){
      hit = true;
      vx *= -1;
      photon.angle *= -1;
    }
    photon.setVelocityX(vx);
    photon.setVelocityY(vy);
    photon.anims.play('hell');
  }

});
