ig.module(
    'game.entities.block'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityBlock = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255,0,255, 0.7)',

            size: {x: 16, y: 16},
            level: null,
            checkAgainst: ig.Entity.TYPE.A,
            animSheet: new ig.AnimationSheet( 'media/block.png', 16, 16),
            collides: ig.Entity.COLLIDES.NEVER,

            init: function (x, y, settings) {
                this.addAnim('idle', 1, [0]);
                this.parent(x, y, settings);
            },
            check: function(other) {
                if(other.getOut()){
                    this.collides = ig.Entity.COLLIDES.ACTIVE;
                }
            },
            update: function () {

            }
        });
    })


