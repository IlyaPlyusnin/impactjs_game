ig.module(
    'game.entities.digme'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityDigme = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255,0,255, 0.7)',

            size: {x: 16, y: 16},
            level: null,
            checkAgainst: ig.Entity.TYPE.A,
            animSheet: new ig.AnimationSheet( 'media/digme.png', 16, 16),
            collides: ig.Entity.COLLIDES.ACTIVE,

            init: function (x, y, settings) {
                this.addAnim('idle', 1, [0]);
                this.parent(x, y, settings);
            },
            check: function(other) {
                if(other.getShovel()){
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                    this.kill();
                }
            },
            update: function () {

            }
        });
    })

