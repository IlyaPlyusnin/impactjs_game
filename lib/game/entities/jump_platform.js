
ig.module(
    'game.entities.jump_platform'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityJump_platform = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255,0,255, 0.7)',

            size: {x: 32, y: 16},
            level: null,
            checkAgainst: ig.Entity.TYPE.A,
            animSheet: new ig.AnimationSheet( 'media/jumpPlatform.png', 32, 16),
            collides: ig.Entity.COLLIDES.ACTIVE,
            init: function (x, y, settings) {
                this.addAnim('idle', 1, [0]);
                this.parent(x, y, settings);
            },
            check: function(other) {

            },
            update: function () {

            }
        });
    })



