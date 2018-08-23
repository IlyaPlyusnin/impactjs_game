/**
 * Created by MadRussian23 on 3/3/2017.
 */
ig.module(
    'game.entities.resetclimb'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityResetclimb = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0,4,255, 0.7)',

            size: {x: 8, y: 8},

            checkAgainst: ig.Entity.TYPE.A,

            init: function (x, y, settings) {
                this.parent(x, y, settings);
            },

            check: function(other){
                other.resetClimb();
            },
            update: function () {

            }
        });
    })



