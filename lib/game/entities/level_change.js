ig.module(
    'game.entities.level_change'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityLevel_change = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255,0,255, 0.7)',
            size: {x: 16, y: 32},
            level: null,
            checkAgainst: ig.Entity.TYPE.A,
            animSheet: new ig.AnimationSheet( 'media/door.png', 16, 32),
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [0]);
            },

            check: function(other) {
                if(other instanceof EntityPlayer){
                    if(other.getKey()){
                        other.setKey(false);
                        if( this.level ) {
                            var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function( m, l, a, b ) {
                                return a.toUpperCase() + b;
                            });
                            if(levelName == "Level3"){
                                ig.game.gravity = 0;
                                ig.game.notLevel3 = false;
                                other.setLevel();
                            }
                            ig.game.loadLevelDeferred( ig.global['Level'+levelName] );
                        }
                    }
                    else{

                            ig.game.spawnEntity('EntityTextballoon3',this.pos.x -10,this.pos.y - 70,null);


                    }

                }
            },

            update: function () {

            }
        });
    })
