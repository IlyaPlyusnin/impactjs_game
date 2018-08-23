
var x;
ig.module(
	'game.main' 
)
.requires(
    'impact.game',
    'impact.font',
    'game.levels.game_level1',
    'game.levels.level2',
    'game.levels.level3',
    'game.entities.textballoon',
    'game.entities.textballon2',
    'game.entities.textballoon3',
    'game.entities.hedge',
    'game.entities.zombie2',
    'game.entities.zombie3'
)

.defines(function(){

MyGame = ig.Game.extend({
    statText: new ig.Font( 'media/04b03.font.png' ),
    lifeSprite: new ig.Image('media/heart.png'),
    keySprite: new ig.Image('media/key.png'),
    notLevel3: true,
    lives: 3,
    arrows: 10,
    fire:5,
    hedge: -1,
    hedge2: -1,
    hearts: 0,
    timer: null,
    str: "",
    str2: "",
    gravity: 300,
	init: function(){
        this.loadLevel(LevelGame_level1);
        this.timer = new ig.Timer(20);

        // Bind keys
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.UP_ARROW, 'up' );
        ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
        ig.input.bind( ig.KEY.X, 'jump' );
        ig.input.bind( ig.KEY.C, 'shoot' );
        ig.input.bind( ig.KEY.B, 'burn' );
        ig.input.bind( ig.KEY.TAB, 'switch' );

	},
	
	update: function() {
        // screen follows the player
        var player = this.getEntitiesByType( EntityPlayer )[0];
        if( player ){
            this.screen.x = player.pos.x - ig.system.width/2;
            this.screen.y = player.pos.y - ig.system.height/2;
        }
        if(this.hedge == 0){
            ig.game.spawnEntity(EntityHedge, 208 , 224);
            ig.game.spawnEntity(EntityHedge, 224 , 224);
            ig.game.spawnEntity(EntityHedge, 240 , 224);
            ig.game.spawnEntity(EntityHedge, 256 , 224);

            ig.game.spawnEntity(EntityZombie3, 80 , 256);
            ig.game.spawnEntity(EntityZombie3, 80 , 64);
            ig.game.spawnEntity(EntityZombie3, 404 , 80);
            ig.game.spawnEntity(EntityZombie3, 404 , 240);
            ig.game.spawnEntity(EntityZombie2, 80 , 80);
            ig.game.spawnEntity(EntityZombie2, 96 , 256);
            ig.game.spawnEntity(EntityZombie2, 400 , 64);
            ig.game.spawnEntity(EntityZombie2, 384 , 240);
            this.hedge = 1;
        }

        if(this.hedge2 == 0){
            ig.game.spawnEntity(EntityHedge, 208 , 144);
            ig.game.spawnEntity(EntityHedge, 224 , 144);
            ig.game.spawnEntity(EntityHedge, 240 , 144);

            ig.game.spawnEntity(EntityZombie3, 352 , 208);
            ig.game.spawnEntity(EntityZombie3, 128 , 112);
            ig.game.spawnEntity(EntityZombie3, 128 , 192);
            ig.game.spawnEntity(EntityZombie3, 352 , 128);
            ig.game.spawnEntity(EntityZombie2, 144 , 112);
            ig.game.spawnEntity(EntityZombie2, 128 , 208);
            ig.game.spawnEntity(EntityZombie2, 336 , 112);
            ig.game.spawnEntity(EntityZombie2, 352 , 208);
            this.hedge2 = 1;
        }

		// Update all entities and backgroundMaps
		this.parent();
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
        var player = this.getEntitiesByType( EntityPlayer )[0];

		this.parent();
        this.statText.draw("Lives", 5,305);
        this.str ="Arrows: ";
        this.str +=this.arrows;
        this.statText.draw(this.str, 70,305);
        this.str2 ="Fire attacks: ";
        this.str2 +=this.fire;
        this.statText.draw(this.str2, 120,305);
        if(player != null){
            if(player.getKey()){
                this.keySprite.draw(190, 315);
            }
        }
        for(var i=0; i < this.lives; i++){
            this.lifeSprite.draw(((this.lifeSprite.width + 2) * i)+5, 315);
        }
	},
    gameOver: function(){
        ig.system.setGame(GameOverScreen);
    },
    gameWon: function(){
        ig.system.setGame(GameWon);
    }

});

    StartScreen = ig.Game.extend({
        instructText: new ig.Font( 'media/04b03.font.png' ),
        background: new ig.Image('media/uncharted.png'),
        init: function() {
            ig.input.bind( ig.KEY.SPACE, 'start');
        },
        update: function() {
            if(ig.input.pressed ('start')){
                ig.system.setGame(MyGame)
            }
            this.parent();
        },
        draw: function() {
            this.parent();
            this.background.draw(0,0);
            var x = ig.system.width/2,
                y = ig.system.height - 10;
            this.instructText.draw( 'Instructions:', 650, 80, ig.Font.ALIGN.CENTER );
            this.instructText.draw( 'Use arrows to move, X to jump', 650, 100, ig.Font.ALIGN.CENTER );
            this.instructText.draw( 'C to shoot arrows, B to shoot fire', 650, 120, ig.Font.ALIGN.CENTER );
            this.instructText.draw( 'Tab to switch between weapons', 650, 140, ig.Font.ALIGN.CENTER );
            this.instructText.draw( 'Press Spacebar To Start', x+40, y, ig.Font.ALIGN.CENTER );
        }
    });
    GameOverScreen = ig.Game.extend({
        instructText: new ig.Font( 'media/04b03.font.png' ),
        background: new ig.Image('media/background.png'),
        gameOver: new ig.Image('media/gameover.png'),
        stats: {},
        init: function() {
            ig.input.bind( ig.KEY.SPACE, 'start');
            //this.stats = ig.finalStats;
        },

        update: function() {
            if(ig.input.pressed('start')){
                ig.system.setGame(StartScreen);
            }
            this.parent();
        },

        draw: function() {
            this.parent();
            this.background.draw(0,0);
            var x = ig.system.width/2;
            var y = ig.system.height/2;
            this.gameOver.draw(0, 0);
            this.instructText.draw('Press Spacebar To Continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
        }
    });

    GameWon = ig.Game.extend({
        instructText: new ig.Font( 'media/04b03.font.png' ),
        background: new ig.Image('media/background.png'),
        gameOver: new ig.Image('media/gamecomplete.png'),
        stats: {},
        init: function() {
            ig.input.bind( ig.KEY.SPACE, 'start');
            //this.stats = ig.finalStats;
        },

        update: function() {
            if(ig.input.pressed('start')){
                ig.system.setGame(StartScreen);
            }
            this.parent();
        },

        draw: function() {
            this.parent();
            this.background.draw(0,0);
            var x = ig.system.width/2;
            var y = ig.system.height/2;
            this.gameOver.draw(0, 0);
            this.instructText.draw('Press Spacebar To Continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
        }
    });
// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main('#canvas', StartScreen, 60, 740, 340, 2);

});




