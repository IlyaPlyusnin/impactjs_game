
ig.module(
    'game.entities.trophy'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityTrophy = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255,0,255, 0.7)',

            size: {x: 19, y: 20},
            level: null,
            checkAgainst: ig.Entity.TYPE.A,
            animSheet: new ig.AnimationSheet( 'media/trophy.png', 19, 20),
            collides: ig.Entity.COLLIDES.PASSIVE,
            init: function (x, y, settings) {
                this.addAnim('idle', 1, [0]);
                this.parent(x, y, settings);
            },
            check: function(other) {
                this.kill();
                ig.game.gameWon();
            },
            update: function () {
                this.parent();
            }
        });
    })



