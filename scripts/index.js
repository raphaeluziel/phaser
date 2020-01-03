document.addEventListener('DOMContentLoaded', function(){
  var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 300 },
              debug: false
          }
      },
      scene: {
          preload: preload,
          create: create,
          update: update
      }
  };

  var photon;

  var game = new Phaser.Game(config);

  let vx = 60;
  let vy = -100;
  let hit = false;

  function preload ()
  {
      this.load.image('metal', 'images/metal.png');
      this.load.spritesheet('photon', 'images/photons.png', { frameWidth: 248, frameHeight: 112});
  }

  function create ()
  {
      // My photons
      photon = this.physics.add.sprite(650, 100, 'photon');
      photon.setGravityY(-300);
      photon.setScale(0.2);
      photon.angle = -30;

      metal = this.physics.add.staticGroup();
      metal.create(200, 400, 'metal').setScale(0.5).refreshBody();

      // photon
      this.anims.create({
          key: 'hell',
          frames: [ { key: 'photon', frame: 5 } ],
          frameRate: 20
      });

      //  Input Events
      cursors = this.input.keyboard.createCursorKeys();

  }

  function update ()
  {
      if (photon.x < 200 && !hit){
        hit = true;
        vx *= -1;
        photon.angle *= -1;
      }
      photon.setVelocityY(vx);
      photon.setVelocityX(vy);
      photon.anims.play('hell');
  }

});
