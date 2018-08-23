/**
 * Created by MadRussian23 on 3/3/2017.
 */
ig.module(
    'game.entities.disappear'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityDisappear = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255,255,255, 0.7)',

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
                other.getHeart();

            },

            update: function () {

            }
        });
    })

