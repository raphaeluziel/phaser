document.addEventListener('DOMContentLoaded', function(){

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 550,
    parent: 'game',
    dom: {
        createContainer: true
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);

  var color = 0;
  var photon;
  var photons = [];
  var flashlight;
  var metal;

  let vx = -8;
  let vxA = -8;
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
    /*
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
    */

    var colorname = document.getElementById('pColor').value;

    timer = this.add.text(60, 60, 'Begin', { fontSize: '32px', fill: '#f00' });

    metal = this.add.image(100, 298, 'metal');
    metal.setScale(0.4);

    photon = this.add.sprite(700, 85, 'photon');
    photon.setScale(0.2);
    photon.y = 73;
    photon.x = 700;
    photon.angle = -20;
    photon.setFrame(color);

    flashlight = this.add.image(700, 80, 'flashlight');
    flashlight.setScale(0.2);
    flashlight.angle = 9;

  }

  var n = 0;
  function update (t)
  {
    n += 1;
    let x;
    if (n % 10 === 0){
      x = this.add.sprite(650, 83, 'photon');
      x.setScale(0.2);
      x.vx = -8;
      x.angle = -20;
      x.setFrame(color);
      photons.push(x);
    }

    for (let i = 0; i < photons.length; i++)
    {

      if (photons[i].x < 120) {
        photons[i].hit = true;
        photons[i].angle *= -1;
      }

      if (photons[i].hit) {
        photons[i].x -= vx;
      }
      else{
        photons[i].x += vx;
      }
      photons[i].y += vy;

    }

    timer.setText(Math.round(t/1000));

  }

});
