document.addEventListener('DOMContentLoaded', function(){

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 550,
    parent: 'game',
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);

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
  document.getElementById('photon_color').addEventListener('change', function(){
    color = parseInt(this.value);
    currentColor.setText(colorNames[color]);
    sessionStorage.setItem('color', color);
  });
  document.getElementById('intensity').addEventListener('change', function(){
    intensity = parseInt(this.value);
    currentIntensity.setText(intensity);
    sessionStorage.setItem('intensity', intensity);
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

    this.add.text(5, 530, 'Color:', { fontSize: '16px', fill: '#fff' });
    currentColor = this.add.text(65, 530, colorNames[color], { fontSize: '16px', fill: '#fff' });

    this.add.text(200, 530, 'Intensity:', { fontSize: '16px', fill: '#fff' });
    currentIntensity = this.add.text(300, 530, intensity, { fontSize: '16px', fill: '#fff' });

    // Remember selections
    if (sessionStorage.getItem('color')){
      color = parseInt(sessionStorage.getItem('color'));
      currentColor.setText(colorNames[color]);
      document.getElementById('photon_color').value = color;
    }
    if (sessionStorage.getItem('intensity')){
      intensity = parseInt(sessionStorage.getItem('intensity'));
      currentIntensity.setText(intensity);
      document.getElementById('intensity').value = intensity;
    }

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
        electrons.push(this.add.sprite(100, 290, 'electron'));
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

      if (electrons[j].x > 800){
        electrons[j].destroy();
        electrons.splice(j, 1);
      }
    }

    timer.setText(Math.round(t/1000));

  }

});
