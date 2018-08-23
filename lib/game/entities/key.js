
ig.module(
    'game.entities.key'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {
        EntityKey = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255,0,255, 0.7)',
            size: {x: 16, y: 16},
            level: null,
            checkAgainst: ig.Entity.TYPE.A,
            animSheet: new ig.AnimationSheet( 'media/key.png', 16, 16),
            collides: ig.Entity.COLLIDES.PASSIVE,
            init: function (x, y, settings) {
                this.addAnim('idle', 1, [0]);
                this.parent(x, y, settings);
            },
            check: function(other) {
                this.kill();
                other.setKey(true);
            },
            update: function () {
            }
        });
    })



