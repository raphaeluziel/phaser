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
  //var airplane;
  var player;
  var stars;
  var bombs;
  var platforms;
  var cursors;
  var score = 0;
  var gameOver = false;
  var scoreText;

  var game = new Phaser.Game(config);

  function preload ()
  {
      this.load.image('airplane', 'images/airplane.jpg');
      this.load.spritesheet('photon', 'images/photons.png', { frameWidth: 248, frameHeight: 112});
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  function create ()
  {
      //  A simple background for our game
      this.add.image(400, 300, 'sky');

      // My plane
      airplane = this.physics.add.image(0, 300, 'airplane');
      airplane.setGravityY(-300);
      airplane.setScale(0.4);
      airplane.angle = -30;
      airplane.x += 200;


      // My photons
      photon = this.physics.add.sprite(100, 450, 'photon');
      photon.setGravityY(-300);
      photon.setScale(0.2);
      photon.angle = -30;

      //  The platforms group contains the ground and the 2 ledges we can jump on
      platforms = this.physics.add.staticGroup();

      //  Here we create the ground.
      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();

      //  Now let's create some ledges
      platforms.create(600, 400, 'ground');
      platforms.create(50, 250, 'ground');
      platforms.create(750, 220, 'ground');

      // The player and its settings
      player = this.physics.add.sprite(100, 450, 'dude');

      //  Player physics properties. Give the little guy a slight bounce.
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);

      //  Our player animations, turning, walking left and walking right.
      this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });

      this.anims.create({
          key: 'turn',
          frames: [ { key: 'dude', frame: 4 } ],
          frameRate: 20
      });

      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
          frameRate: 10,
          repeat: -1
      });

      // photon
      this.anims.create({
          key: 'hell',
          frames: [ { key: 'photon', frame: 5 } ],
          frameRate: 20
      });


      //  Input Events
      cursors = this.input.keyboard.createCursorKeys();

      //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
      stars = this.physics.add.group({
          key: 'star',
          repeat: 11,
          setXY: { x: 12, y: 0, stepX: 70 }
      });

      stars.children.iterate(function (child) {

          //  Give each star a slightly different bounce
          child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

      });

      bombs = this.physics.add.group();

      //  The score
      scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

      //  Collide the player and the stars with the platforms
      this.physics.add.collider(player, platforms);
      this.physics.add.collider(stars, platforms);
      this.physics.add.collider(bombs, platforms);

      //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
      // this.physics.add.overlap(player, stars, collectStar, null, this);

  }

  function update ()
  {
      airplane.setVelocityX(50);

      photon.setVelocityX(50);
      photon.setVelocityY(-30);
      photon.anims.play('hell');

      if (gameOver)
      {
          return;
      }

      if (cursors.left.isDown)
      {
          player.setVelocityX(-160);
          //photon.setVelocityX(-80);
          player.anims.play('left', true);
      }
      else if (cursors.right.isDown)
      {
          //photon.setVelocityX(80);
          player.setVelocityX(160);
          player.anims.play('right', true);
      }
      else
      {
          player.setVelocityX(0);
          //photon.setVelocityX(0);
          player.anims.play('turn');
          //photon.anims.play('hell');
      }

      if (cursors.up.isDown && player.body.touching.down)
      {
          player.setVelocityY(-330);
      }
  }

});
