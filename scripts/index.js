document.addEventListener('DOMContentLoaded', function(){

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    parent: 'game',
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);

  var message = "";

  var color = 1;
  var colorNames = ['Infrared', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Ultraviolet'];
  var intensity = 1;
  var intensityName = '1';

  var photon;
  var photons = [];
  var electron;
  var electrons = [];
  var flashlight;
  var metal;

  var vx = -8;
  var vy = 3;
  var vex = 10;
  var hit = false;

  // Change color and/or intensity when selection changes
  document.getElementById('photon_energy').addEventListener('change', function(){
    message = "";
    if (ev < 1.00) { message = "Enter a photon energy value between 1 and 10"; }
    else if (ev < 1.59) { color = 0; }
    else if (ev < 2.00) { color = 1; }
    else if (ev < 2.08) { color = 2; }
    else if (ev < 2.15) { color = 3; }
    else if (ev < 2.53) { color = 4; }
    else if (ev < 2.73) { color = 5; }
    else if (ev < 3.19) { color = 6; }
    else if (ev < 10.0) { color = 7; }
    else { message = "Enter a photon energy value between 1 and 10"; }
    document.getElementById('message').innerHTML = message;
  });

  document.getElementById('intensity').addEventListener('change', function(){
    message = "";
    intensity = parseInt(this.value);
    if (intensity > 10 || intensity < 0 || isNaN(intensity)) {
      intensity = 1;
      document.getElementById('intensity').value = 1;
      document.getElementById('message').innerHTML = "Enter an intensity between 0 and 10";
    }
  });

  function preload ()
  {
    this.load.image('metal', 'images/metal.png');
    this.load.image('flashlight', 'images/flashlight.png');
    this.load.image('electron', 'images/electron.png');
    this.load.spritesheet('photon', 'images/photons.png', { frameWidth: 255, frameHeight: 112});
  }

  function create ()
  {
    timer = this.add.text(20, 20, 'Begin', { fontSize: '24px', fill: '#fcc' });

    metal = this.add.image(100, 298, 'metal');
    metal.setScale(0.4);

    flashlight = this.add.image(700, 80, 'flashlight');
    flashlight.setScale(0.2);
    flashlight.angle = 9;

  }

  var n = 0;
  function update (t)
  {
    n += 1;
    let x;
    if (n % Math.round((100 / intensity)) === 0){
      x = this.add.sprite(650, 80 + 30 * Math.random(), 'photon');
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
        electrons.push(this.add.sprite(photons[i].x, photons[i].y, 'electron'));
        electrons[electrons.length - 1].setScale(0.1);
      }

      if (photons[i].hit) {
        photons[i].x -= vx;
      }
      else{
        photons[i].x += vx;
      }
      photons[i].y += vy;

      if (photons[0].y > 600){
        photons[0].destroy();
        photons.shift();
      }

    }

    for (let j = 0; j < electrons.length; j++){
      electrons[j].x += vex;

      if (electrons[j].x > 500){
        electrons[j].destroy();
        electrons.splice(j, 1);
      }
    }

    timer.setText(Math.round(t/1000));

  }

});
