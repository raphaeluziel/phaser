var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    dom: {
        createContainer: true
    },
    scene: {
        create: create
    }
};

var game = new Phaser.Game(config);

function create ()
{
    var style = {
        'background-color': 'lime',
        'width': '220px',
        'height': '100px',
        'font': '48px Arial',
        'font-weight': 'bold'
    };

    var element = this.add.dom(400, 300, 'div', style, 'Phaser 3');

}
