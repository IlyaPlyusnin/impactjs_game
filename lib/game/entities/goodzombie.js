
var zombie = true;
ig.module(
    'game.entities.goodzombie'
)
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityGoodzombie = ig.Entity.extend({
            animSheet: null,
            animZombie:  new ig.AnimationSheet('media/ilya.png', 16, 16),
            animPrincess: new ig.AnimationSheet('media/princess.png', 16, 16),
            size: {x: 8, y:14},
            offset: {x: 4, y: 2},
            maxVel: {x: 100, y: 100},
            flip: false,
            friction: {x: 150, y: 0},
            speed: 14,
            health: 30,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.PASSIVE,
            name: 'Talkie',
            talked:0,
            Anim:'idle',
            times:400,
            init: function( x, y, settings) {
                this.parent( x, y, settings);
                this.setAnim(this.animPrincess);
            },
            update: function(){
                if(this.times>=0 && this.Anim == 'Talk'){
                    if(this.times == 400){this.currentAnim = this.anims.Talk;}
                    this.times = this.times -1;
                }
                if(this.times == 0){
                    this.currentAnim = this.anims.idle;
                    this.times = -1;
                }
                this.parent();
            },

            setAnim: function(sheet){
                //this.animSheet =  new ig.AnimationSheet(sheet, 16, 16);
                this.animSheet = sheet;
                this.currentAnim = this.animSheet.walk;
                this.addAnim('walk', .07, [0,1,2]);
                this.addAnim('Talk',.07,[5,6]);
            },
            handleMovementTrace: function( res ) {
                this.parent( res );
                // collision with a wall? return!
                if( res.collision.x ) {
                    this.flip = !this.flip;
                }
            },
            check: function( other ) {
                /*
                 if(other.pos.x > this.pos.x){
                 other.bounceMe3();
                 }
                 else{
                 other.bounceMe2();
                 }
                 */
                if(this.talked == 0){
                    this.Anim = 'Talk';
                    this.talked = 1;
                    ig.game.spawnEntity('EntityTextballoon',this.pos.x -10,this.pos.y - 70,null);
                    ig.game.sortEntitiesDeferred();
                }

            },
            receiveDamage: function(value){
                this.parent(value);
                if(this.health > 0)
                    ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {particles: 2, colorOffset: 1});
            },
            kill: function(){
                this.parent();
                ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
            }
        });
    });

