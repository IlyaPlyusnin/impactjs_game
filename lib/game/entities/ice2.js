/**
 * Created by MadRussian23 on 3/5/2017.
 */
/**
 * Created by MadRussian23 on 3/5/2017.
 */
ig.module(
    'game.entities.ice2'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityIce2 = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(5,0,255, 0.9)',

            size: {x: 8, y: 8},
            duration: 5,
            count: 5,

            checkAgainst: ig.Entity.TYPE.A,

            durationTimer: null,
            nextEmit: null,


            init: function (x, y, settings) {
                this.parent(x, y, settings);

                this.durationTimer = new ig.Timer();
                this.nextEmit = new ig.Timer();
            },

            check: function(other){
                other.hitIce();
                other.bounceMe3();
            },

            update: function () {

            }
        });
    })

