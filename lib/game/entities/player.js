var leftEnabled = true;
var rightEnabled = true;
var upEnabled = false;
var downEnabled = false;
var gotShovel = false;
var gotKey =  false;
var out = false;
var up = false;
var down = false;
var right = true;


ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(255, 0, 0, 0.7)',
        animSheet: new ig.AnimationSheet( 'media/hero2.png', 16, 16 ),
        size: {x:12, y:12},
        //size: {x: 8, y:14},
        offset: {x: 2, y: 4},
        flip: false,
        maxVel: {x: 120, y: 190},
        gravityFactor: 1,
        friction: {x: 600, y: 0},
        accelGround: 100,
        accelAir: 100,
        jump: 250,
        jump2:false,
        arrow: true,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        weapon: 0,
        totalWeapons: 2,
        activeWeapon: "EntityBullet",
        startPosition: null,
        invincible: true,
        invincibleDelay: 2,
        invincibleTimer:null,
        stomp: false,

        init: function( x, y, settings ) {
        	this.parent( x, y, settings );
            this.setupAnimation();
            this.startPosition = {x:x,y:y};
            this.invincibleTimer = new ig.Timer();
            this.makeInvincible();

        },
        climb: function(){
          this.friction.y = 600;
          upEnabled = true;
          downEnabled = true;
          ig.game.notLevel3 = false;
        },
        water: function(){
                this.upSet(true);
                this.waterAnimation();
                this.yUp(17);
        },
        setLevel: function(){
            ig.game.notLevel3 = false;
            this.friction.y = 600;
            upEnabled = true;
            downEnabled = true;
        },
        resetClimb: function(){
            this.friction.y = 0;
            upEnabled = false;
            downEnabled = false;
            rightEnabled = true;
            leftEnabled = true;
            ig.game.notLevel3 = true;
        },
        setupAnimation: function(){
            //offset = offset * 10;
            //this.addAnim('idle', 1, [0+offset]);
            //this.addAnim('run', .07, [0+offset,1+offset,2+offset,3+offset,4+offset]);
            //this.addAnim('jump', 1, [1+offset, 2+offset,3+offset]);
            //this.addAnim('fall', 0.4, [0+offset]);
            this.currentAnim = this.animSheet.idle;
            this.currentAnim = this.animSheet.right;
            this.currentAnim = this.animSheet.up;
            this.currentAnim = this.animSheet.down;
            this.currentAnim = this.animSheet.jump;
            this.currentAnim = this.animSheet.fall;
            this.addAnim( 'idle', 1, [3] );
            this.addAnim('idleup', 1, [13] );
            this.addAnim('idledown', 1, [10] );
            this.addAnim( 'right', 0.07, [0,1,2,3] );
            this.addAnim('down',0.07,[10,11,12]);
            this.addAnim('up',0.07,[13,14,15]);
            this.addAnim( 'jump', 1, [0,5] );
            this.addAnim( 'fall', 0.4, [3] );
            this.addAnim('burn', 0.4, [4] );
        },
        waterAnimation: function(){
            this.currentAnim = this.animSheet.idle;
            this.currentAnim = this.animSheet.right;
            this.currentAnim = this.animSheet.jump;
            this.currentAnim = this.animSheet.fall;
            this.addAnim( 'idle', 0.07, [6] );
            this.addAnim( 'right', 0.07, [6,7] );
            this.addAnim( 'jump', 0.07, [6,7] );
            this.addAnim( 'fall', 0.07, [6,7] );
        },
        airAnimation: function(){
            this.currentAnim = this.animSheet.idle;
            this.currentAnim = this.animSheet.right;
            this.currentAnim = this.animSheet.jump;
            this.currentAnim = this.animSheet.fall;
            this.addAnim( 'idle', 0.07, [8] );
            this.addAnim( 'right', 0.07, [8,9] );
            this.addAnim( 'jump', 0.07, [8,9] );
            this.addAnim( 'fall', 0.4, [8] );
        },
        makeInvincible: function(){
            this.invincible = true;
            this.invincibleTimer.reset();
        },
        isStanding: function(){
            if(this.standing){
                return true;
            }
            return false;
        },
        bounceMe: function(){
            this.vel.x =  -5*(this.vel.x+50);
            this.vel.y =  -(this.vel.y+70);
        },
        bounceMe2: function(){
            this.vel.x =  -(this.vel.x+50);
        },
        bounceMe3: function(){
            this.vel.x = (this.vel.x+150);
        },
        bounceMe4: function(){
            this.vel.y =  (this.vel.y+150);
        },
        leftSet: function(left){
            leftEnabled = left;
        },
        rightSet: function(right){
            rightEnabled=right;
        },
        upSet: function(up){
            upEnabled = up;
        },
        setGravity: function(x){
            this.maxVel.y = x;
        },
        yDown: function(){
            this.vel.y -= 5.4;
        },
        justUp: function(number){
            this.vel.y = number;
        },
        jumpSet: function(set){
            this.jump2 = set;
        },
        yUp: function(x){
            this.maxVel.y = x;
        },
        hitZombie: function(){
            this.kill();
        },
        setShovel:function(shovel){
            gotShovel = shovel;
        },
        getShovel: function(){
            return gotShovel;
        },
        setKey: function(key){
            gotKey = key
        },
        getKey: function(){
            return gotKey;
        },
        setOut: function(boolean){
            out = boolean;
        },
        getOut: function(){
            return out;
        },
        update: function() {
            if(!ig.game.notLevel3){
                this.setLevel();
            }
              // move left or right
        	var accel = this.standing ? this.accelGround : this.accelAir;
        	if( ig.input.state('left') ) {
        	    if(leftEnabled){
                    this.currentAnim = this.anims.right;
                    this.vel.x = -100;
                    this.flip = true;
                    right = true;
                    up = false;
                    down = false;
                }
        	}
        	else if( ig.input.state('right') ) {
        	    if(rightEnabled){
                    this.currentAnim = this.anims.right;
                    this.vel.x = 100;
                    this.flip = false;
                    right = true;
                    up = false;
                    down = false;
                }
        	}
        	else if(ig.input.state('up')){
        	    if(upEnabled){
                    up = true;
                    down = false;
                    right = false;
                    this.currentAnim = this.anims.up;
                    this.vel.y = -100;
                }

            }
        	else if(ig.input.state('down')){
        	    if(downEnabled){
                    this.currentAnim = this.anims.down;
                    this.vel.y = 100;
                    right = false;
                    up = false;
                    down = true;
                }

            }
        	else{
        		this.accel.x = 0;
        	}
        	// jump
        	if( this.standing && ig.input.pressed('jump') ) {

        	    if(this.jump2){
        	        this.setGravity(300);
                    this.vel.y = -this.jump-200;
                }
                else{
                    this.vel.y = -(this.jump);
                }

        	}
            // shoot
            if( ig.input.pressed('shoot') ) {
        	    if(this.arrow){
                    if(ig.game.arrows > 0){
                        ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} );
                        ig.game.arrows--;
                    }
                }

            }
            if( ig.input.pressed('burn') ) {
        	    if(!this.arrow){
                    if(ig.game.fire > 0){
                        ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} );
                        ig.game.fire--;
                    }
                }

            }
            if( ig.input.pressed('switch') ) {
                this.weapon ++;
                if(this.weapon >= this.totalWeapons)
                    this.weapon = 0;
                switch(this.weapon){
                    case(0):
                        this.activeWeapon = "EntityBullet";
                        this.arrow = true;
                        break;
                    case(1):
                        this.activeWeapon = "EntityBurn";
                        this.arrow = false;
                        break;
                }
                this.setupAnimation(this.weapon);
            }
            if(ig.game.notLevel3){
                // set the current animation, based on the player's speed
                if( this.vel.y < 0 ) {
                    this.currentAnim = this.anims.jump;
                }else if( this.vel.y > 0 ) {
                    this.currentAnim = this.anims.fall;
                }else if( this.vel.x != 0 ) {
                    this.currentAnim = this.anims.right;
                }else{
                    this.currentAnim = this.anims.idle;
                }
            }
            else{
                if(up) {
                    if(this.vel.y < 0){
                        this.currentAnim= this.anims.up;
                    }
                    else{
                        this.currentAnim = this.anims.idleup;
                    }

                }
                else if(right) {
                    if(this.vel.x != 0){
                        this.currentAnim = this.anims.right;
                    }
                    else{
                        this.currentAnim = this.anims.idle;
                    }

                }
                else if(down){
                    if(this.vel.y > 0){
                        this.currentAnim = this.anims.down;
                    }
                    else{
                        this.currentAnim = this.anims.idledown;
                    }

                }
            }




            this.currentAnim.flip.x = this.flip;
            if( this.invincibleTimer.delta() > this.invincibleDelay ) {
                this.invincible = false;
                this.currentAnim.alpha = 1;
            }
        	// move!
        	this.parent();
        },
        kill: function(){
            /*
        	this.parent();
        	var x = this.startPosition.x;
        	var y = this.startPosition.y;
            leftEnabled = true;
            rightEnabled = true;
            upEnabled = false;
            this.jump2 = false;
        	ig.game.lives = 3;
        	ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {callBack:function(){ig.game.spawnEntity( EntityPlayer, x, y)}} );
        	*/

            this.parent();
            ig.game.respawnPosition = this.startPosition;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {callBack:this.onDeath});
        },
        onDeath: function(){
            ig.game.lives --;
            if(ig.game.lives == 0){
                ig.game.gameOver();
            }
            else{
                ig.game.spawnEntity( EntityPlayer, ig.game.respawnPosition.x, ig.game.respawnPosition.y);
            }
        },

        immortal: function () {
            this.invincible = true;
        },
        mortal: function () {
            this.invincible = false;
        },

        receiveDamage: function(amount, from){
            if(this.invincible)
                return;
            this.parent(amount, from);
        },
        draw: function(){
            if(this.invincible)
                this.currentAnim.alpha = this.invincibleTimer.delta()/this.invincibleDelay * 1 ;
            this.parent();
        }
    });
    EntityBurn = ig.Entity.extend({
        size: {x: 16, y: 16},
        animSheet: new ig.AnimationSheet( 'media/burn.png', 16, 16 ),
        maxVel: {x: 200, y: 200},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) , y-8, settings );
            if(up){
                this.maxVel.x = 0;
                this.vel.y = this.accel.x = (settings.flip ? this.maxVel.y : this.maxVel.y);
                this.vel.y = -this.vel.y;

            }
            else if(down){
                this.maxVel.x = 0;
                this.vel.y = this.accel.x = (settings.flip ? this.maxVel.y : this.maxVel.y);
            }
            else if(right){
                this.maxVel.y = 0;
                this.maxVel.x = 200;
                this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            }
            this.addAnim( 'idle', 0.2, [0,1] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){
                this.kill();
            }
        },
        check: function( other ) {
            other.kill();
            this.kill();
        }
    });

    EntityBullet = ig.Entity.extend({
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/arrow.png', 5, 3 ),
        maxVel: {x: 200, y: 200},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) , y+8, settings );
            if(up){
                this.maxVel.x = 0;
                this.vel.y = this.accel.x = (settings.flip ? this.maxVel.y : this.maxVel.y);
                this.vel.y = -this.vel.y;

            }
            else if(down){
                this.maxVel.x = 0;
                this.vel.y = this.accel.x = (settings.flip ? this.maxVel.y : this.maxVel.y);
            }
            else if(right){
                this.maxVel.y = 0;
                this.maxVel.x = 200;
                this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            }



            this.addAnim( 'idle', 0.2, [0] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){
                this.kill();
            }
        },
        check: function( other ) {
            other.receiveDamage(10,other);
            this.kill();
        }
    });

    EntityDeathExplosion = ig.Entity.extend({
        lifetime: 1,
        callBack: null,
        particles: 25,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            for(var i = 0; i < this.particles; i++)
                ig.game.spawnEntity(EntityDeathExplosionParticle, x, y, {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
            this.idleTimer = new ig.Timer();
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                this.kill();
                if(this.callBack)
                    this.callBack();
                return;
            }
        }
    });

    EntityDeathExplosionParticle = ig.Entity.extend({
        size: {x: 2, y: 2},
        maxVel: {x: 160, y: 200},
        lifetime: 2,
        fadetime: 1,
        bounciness: 0,
        vel: {x: 100, y: 30},
        friction: {x:100, y: 0},
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 7,
        animSheet: new ig.AnimationSheet( 'media/blood.png', 2, 2 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1));
            this.addAnim( 'idle', 0.2, [frameID] );
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                this.kill();
                return;
            }
            this.currentAnim.alpha = this.idleTimer.delta().map(
                this.lifetime - this.fadetime, this.lifetime,
                1, 0
            );
            this.parent();
        }
    });

});
