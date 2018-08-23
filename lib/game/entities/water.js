
ig.module(
    'game.entities.water'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityWater = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(5,190,3, 0.7)',

            size: {x: 8, y: 8},


            checkAgainst: ig.Entity.TYPE.A,



            init: function (x, y, settings) {
                this.parent(x, y, settings);

            },

            check: function(other){
                if(!other.jump2){
                    other.water();
                }
            },

            update: function () {
            }
        });
    })

