ig.module(
    'game.entities.appear2'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityAppear2 = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255,0,255, 0.7)',

            size: {x: 16, y: 32},
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,

            init: function (x, y, settings){
                this.parent(x, y, settings);
            },

            check: function( other ){
                ig.game.hedge2++;
            },

            update: function (){

            }
        });
    })


