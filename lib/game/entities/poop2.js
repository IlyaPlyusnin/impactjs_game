var myBool= false;
var myObj;
ig.module(
    'game.entities.poop2'
)
    .requires(
        'impact.entity'
    )
    .defines(function() {

        EntityPoop2 = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255,0,255, 0.7)',

            size: {x: 8, y: 8},
            duration: 5,
            count: 5,

            checkAgainst: ig.Entity.TYPE.A,

            timer: null,
            nextEmit: null,



            init: function (x, y, settings) {
                this.parent(x, y, settings);

            },

            check: function(other){
                myObj = other;
                myBool = true;
                this.timer = new ig.Timer(5);

            },

            update: function () {
                if(myBool){
                    if(!(this.timer.delta()>0)){
                      myObj.immortal();
                    }
                    else{
                        myObj.mortal();
                    }

                    this.parent();
                }

            }
        });
    })

