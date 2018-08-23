var zombie = true;
ig.module(
	'game.entities.zombie'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityZombie = ig.Entity.extend({
    animSheet: null,
    animZombie:  new ig.AnimationSheet('media/zombie_bride.png', 16, 16),
    animPrincess: new ig.AnimationSheet('media/princess.png', 16, 16),
    size: {x: 8, y:14},
    offset: {x: 4, y: 2},
    maxVel: {x: 100, y: 100},
    flip: false,
    friction: {x: 150, y: 0},
    isLevel3: false,
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
    	// near an edge? return!
        /*
    	if( !ig.game.collisionMap.getTile(
    		this.pos.x + (this.flip ? +4 : this.size.x -4),
    			this.pos.y + this.size.y+1
    		)
    	) {
    		this.flip = !this.flip;
    	}
    	*/

    	var xdir = this.flip ? -1 : 1;
    	this.vel.x = this.speed * xdir;
    	this.currentAnim.flip.x = this.flip;
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
        this.addAnim('walk', .07, [0,1,2,3]);
    },
    handleMovementTrace: function( res ) {
    	this.parent( res );
    	// collision with a wall? return!
    	if( res.collision.x ) {
    		this.flip = !this.flip;
    	}
    },
    check: function( other ) {
        if(other.pos.y < this.pos.y){
            this.kill();
        }
        else{
            if(other.pos.x > this.pos.x){
                other.bounceMe3();
                other.hitZombie();
            }
            else{
                other.bounceMe2();
                other.hitZombie();
            }
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
