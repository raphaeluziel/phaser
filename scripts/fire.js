document.addEventListener('DOMContentLoaded', function(){

  var color = 0;

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: this,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    dom: {
        createContainer: true
    },
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

    var photonColor = document.createElement('input');
    photonColor.type = "number";
    photonColor.min = 0;
    photonColor.max = 5;
    photonColor.defaultValue = 2;
    photonColor.id = "photon_color"
    photonColor.className = "photonInput";
    this.add.dom(30, 580, photonColor);

    var setColor = document.createElement('button');
    setColor.innerHTML = "Set";
    setColor.className = "button";
    setColor.id = "choose_color";
    setColor.addEventListener ('click', function(){
      color = document.getElementById('photon_color').value;
    });
    this.add.dom(76, 576, setColor);

    timer = this.add.text(60, 60, 'Begin', { fontSize: '32px', fill: '#f00' });

    metal = this.add.image(100, 298, 'metal');
    metal.setScale(0.4);

    photon = this.add.sprite(700, 85, 'photon');
    photon.setScale(0.2);
    photon.y = 73;
    photon.x = 700;
    photon.angle = -20;
    photon.setFrame(color);

    photons = this.physics.add.group({
        key: 'photon',
        repeat: 6,
        setXY: { x: 240, y: 50, stepX: 40 },
        active: true,
        runChildUpdate: true
    });


    photons.children.iterate(function (photon) {
      photon.setScale(0.2);
      photon.angle = -20;
      photon.setFrame(color);
    });

    flashlight = this.add.image(700, 80, 'flashlight');
    flashlight.setScale(0.2);
    flashlight.angle = 9;

  }

  function update (t)
  {
    photon.setFrame(color);
    timer.setText(Math.round(t/1000));

    if (photon.x < 120) {
      vx *= -1;
      photon.angle *= -1;
    }

    photon.x += vx;
    photon.y += vy;

  }


});
