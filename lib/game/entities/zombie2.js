var zombie = true;
ig.module(
    'game.entities.zombie2'
)
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityZombie2 = ig.Entity.extend({
            animSheet: null,
            animZombie:  new ig.AnimationSheet('media/zombie.png', 16, 16),
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
            init: function( x, y, settings) {
                this.parent( x, y, settings);
                this.setAnim(this.animZombie);
            },
            update: function() {
                if(!this.flip){
                    this.currentAnim = this.anims.down;
                    this.vel.y = 14;
                }
                else{
                    this.currentAnim = this.anims.up;
                    this.vel.y = -14;
                }
                this.parent();
            },
            transform: function(){
                zombie = false;
                this.setAnim(this.animPrincess);
            },
            setAnim: function(sheet){
                //this.animSheet =  new ig.AnimationSheet(sheet, 16, 16);
                this.animSheet = sheet;
                this.currentAnim = this.animSheet.walk;
                this.addAnim('down', .07, [6,7,8]);
                this.addAnim('up', .07, [9,10,11]);
            },
            handleMovementTrace: function( res ) {
                this.parent( res );
                // collision with a wall? return!
                if( res.collision.y) {
                    this.flip = !this.flip;
                }
            },
            check: function( other ) {
                other.kill();
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

