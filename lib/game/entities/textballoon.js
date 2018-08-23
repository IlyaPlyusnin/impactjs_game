var last = false;
ig.module('game.entities.textballoon'
)
    .requires('impact.entity','impact.game'
    )

    .defines( function(){
        EntityTextballoon = ig.Entity.extend({
            pos:{x:0,y:0},// a default position
            size:{x:100,y:67},// the default size
            lifeTime:200,// show the balloon for 200 frames
            //media used by text balloon
            font : new ig.Font('media/04b03.font.png'),// the font sheet
            animSheet: new ig.AnimationSheet('media/bubble.png',100,67),// the animation
            wrapper : null,// place holder
            init: function(x,y,settings){
                this.zIndex = 1000;// always show on top
                this.addAnim('idle',1,[0]);// the default graphic
                this.currentAnim = this.anims.idle;
                this.parent(x,y,settings);// defaults
                this.wrapper = new WordWrap('From this point on, anything could happen in the next level.',20);//we


            },
            update:function(){
                this.lifeTime = this.lifeTime -1;// counter for the lifetime
                if(this.lifeTime < 0){
                    if(last){
                        this.kill();
                    }
                    last = true;
                    this.lifeTime = 200;
                    this.wrapper = new WordWrap('My evil sisters are lurking around in there. Becareful!',20);

                }// remove the balloon after 200 frames
                this.parent();// defaults
            },
            draw:function(){
                this.parent();// defaults
                var x = this.pos.x - ig.game.screen.x + 5;// x coordinate draw position
                var y = this.pos.y - ig.game.screen.y + 5;// y coordinate draw position
                this.font.draw(this.wrapper.wrap(),x, y,ig.Font.ALIGN.LEFT);//put it on the screen
            }
        });

        WordWrap = ig.Class.extend({
            text:"",
            maxWidth:100,
            cut: false,
            init:function (text, maxWidth, cut) {
                this.text = text;
                this.maxWidth = maxWidth;
                this.cut = cut;
            },
            wrap:function(){
                var regex = '.{1,' +this.maxWidth+ '}(\\s|$)' + (this.cut ? '|.{' +this.maxWidth+ '}|.+$' : '|\\S+?(\\s|$)');
                return this.text.match( RegExp(regex, 'g') ).join( '\n' );
            }
        })
    });
