ig.module(
    'game.entities.hedge'
)
    .requires(
        'impact.entity','impact.game'
    )
    .defines(function() {

        EntityHedge = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255,0,255, 0.7)',
            size: {x: 16, y: 16},
            level: null,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.FIXED,
            animSheet: new ig.AnimationSheet( 'media/hedge.png', 16, 16),
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                //this.addAnim('grow', .2, [0,1,2]);
                this.addAnim('idle', .2, [2]);
            },

            check: function(other) {

            },

            update: function () {
                this.parent();
            }
        });
    })
