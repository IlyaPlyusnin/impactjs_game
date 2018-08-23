var animation;
ig.module(
    'game.entities.fire'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityFire = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255,0,255, 0.7)',

            size: {x: 16, y: 16},
            level: null,
            checkAgainst: ig.Entity.TYPE.A,
            animSheet: new ig.AnimationSheet( 'media/fire.png', 16, 16),
            collides: ig.Entity.COLLIDES.PASSIVE,
            init: function (x, y, settings) {
                this.parent(x, y, settings);

                //animation = new ig.Animation( this.animSheet, 0.2, [0,1,2]);
                this.addAnim('idle', .5, [0,1]);

            },
            check: function(other) {
                other.kill();
            },
            update: function () {
                this.parent();
            }
        });
    })



