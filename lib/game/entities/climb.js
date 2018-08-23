
ig.module(
    'game.entities.climb'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityClimb = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(9,0,187, 0.7)',

            size: {x: 8, y: 8},


            checkAgainst: ig.Entity.TYPE.A,

            init: function (x, y, settings) {
                this.parent(x, y, settings);
            },

            check: function(other){
                other.climb();
            },
            update: function () {

            }
        });
    })


