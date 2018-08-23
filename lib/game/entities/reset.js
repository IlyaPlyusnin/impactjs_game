/**
 * Created by MadRussian23 on 3/3/2017.
 */
ig.module(
    'game.entities.reset'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityReset = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0,4,255, 0.7)',

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


            triggeredBy: function (entity, trigger) {
                this.durationTimer.set(this.duration);
                this.nextEmit.set(0);
            },
            check: function(other){
                other.setOut(true);
                other.leftSet(true);
                other.rightSet(true);
                other.setGravity(190);
                other.upSet(false);
                other.jumpSet(false);
                other.setupAnimation();

            },

            update: function () {

            }
        });
    })

