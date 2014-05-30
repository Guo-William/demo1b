/*
    GAME SCREEN
    For this demo we create a SpriteSheetAnimation object and
    five buttons to illustrate the animation controls: Play,
    Stop, 24fps, 48fps, and goto First Frame.
 */
GameScreen = function(width,height)
{
    //Constructor
    GameScreen.superclass.constructor.apply(this,arguments);

    //Create a top-level variable for our SpriteSheetAnimation object
    this.spriteSheetAnim;
	//
	this.startButton;
	this.gameTimer;
	this.scoreValue;
	this.scoreValueOut;
	this.rotationValue;
	this.gameOver;
	this.turn = "";
	this.forward = false;
	this.dx = 2;
	this.dy = 2;
	this.score = 0;
	this.hityet = false;
	this.timerButton;
	this.addTime = 0;
	this.timeLeft = 0;
	this.timeValue;
	this.point = 3;
	
	
	//
	//Set background color
    this.backgroundColor = "#039AFF";

    //Just some display text
    /*this.addChild(new TGE.Text().setup({
        x:320,
        y:100,
        text:"TGE SpriteSheetAnimation Object",
        font:"32px sans-serif",
        color:"#FFF"
    }));*/

    //*********************************************************
    //******     SET UP SPRITESHEET ANIMATION OBJECT     ******
    //*********************************************************
    /*
        This is where we set up our sprite sheet animation object
        with initial properties and position it on the screen.
    */
	this.spriteBall = new TGE.SpriteSheetAnimation().setup({
		image:"spriteBall",
		columns:8,
		rows:8,
		totalFrames:64,
		fps:34,
		x:320,
		y:100
	});			
    this.spriteSheetAnim = new TGE.SpriteSheetAnimation().setup({
        image:"spriteSheetImg",
        columns:4,
        rows:5,
        totalFrames:19,
        fps:24,
        x: 320,
        y: 240
    });
	//allows spider movement
	this.scoreValue = new TGE.Text().setup({
		x:50,
		y:20,
		text:"",
		font:"32px Times New Roman",
		color:"#FFF"
	});
	this.timeValue = new TGE.Text().setup({
		x:80,
		y:45,
		text:"",
		font:"32px Times New Roman",
		color:"#FFF"
	});
	this.gameOver = new TGE.Text().setup({
		x:400,
		y:400,
		text:"GAME OVER",
		font:"32px Times New Roman",
		color:"#FFF"
	});
	this.startButton = new TGE.Button().setup({
        textColor: "#000",
        text: "Start",
        x:this.percentageOfWidth(0.5),
        y:450,
        pressFunction:this.beginGame.bind(this)
    });
	this.timer3Button = new TGE.Button().setup({
		textColor: "#000",
        text: "3 Seconds",
        x:this.percentageOfWidth(0.2),
        y:500,
        pressFunction:this.setTime.bind(this)
	});
	this.timer5Button = new TGE.Button().setup({
		textColor: "#000",
        text: "5 Seconds",
        x:this.percentageOfWidth(0.5),
        y:500,
        pressFunction:this.setTime.bind(this)
	});
	this.timer7Button = new TGE.Button().setup({
		textColor: "#000",
        text: "7 Seconds",
        x:this.percentageOfWidth(0.8),
        y:500,
        pressFunction:this.setTime.bind(this)
	});
	
		
	this.addChild(this.timer3Button);
	this.addChild(this.timer5Button);
	this.addChild(this.timer7Button);
	
	this.spriteSheetAnim.addEventListener("keyup",this.stopAnim.bind(this));
	this.spriteSheetAnim.addEventListener("keydown",this.MoveSpider.bind(this));
	this.spriteBall.addEventListener("update",this.SpriteBallMove.bind(this));
	
	/*Rotational value indicator
	/*this.rotationValue = new TGE.Text().setup({
		x:300,
		y:300,
		text:"",
		font:"32px Times New Roman"
		});
	this.addChild(this.rotationValue);*/
    //Start the SpriteSheetAnimation Object playing
/*   //this.spriteSheetAnim.play();
/*
    //*************************************
    //******     CONTROL BUTTONS     ******
    //*************************************
    //Adding control buttons for the SpriteSheetAnimation Object
    //Play Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "Play",
        x:this.percentageOfWidth(0.5),
        y:400,
        pressFunction:this.playAnim.bind(this)
    }));

    //Stop Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "Stop",
        x:this.percentageOfWidth(0.5),
        y:450,
        pressFunction:this.stopAnim.bind(this)
    }));

    //24 FPS Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "24 fps",
        x:this.percentageOfWidth(0.33),
        y:500,
        pressFunction:this.set24FPS.bind(this)
    }));

    //48 FPS Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "48 fps",
        x:this.percentageOfWidth(0.66),
        y:500,
        pressFunction:this.set48FPS.bind(this)
    }));

    //First Frame Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "First Frame",
        x:this.percentageOfWidth(0.5),
        y:550,
        pressFunction:this.gotoFirstFrame.bind(this)
    }));*/
}

GameScreen.prototype =
{
	
    //*************************************************
    //******     ANIMATION CONTROL FUNCTIONS     ******
    //*************************************************
	beginGame: function(){
		this.addChild(this.spriteBall);
		this.spriteBall.play();
		this.addChild(this.spriteSheetAnim);
		this.addChild(this.scoreValue);
		this.addChild(this.timeValue);
		this.removeChild(this.startButton);
		this.spriteSheetAnim.addEventListener("update",this.updateSpider.bind(this));
	},
	setTime: function(event){
		var btn = event.text;
		this.addTime = parseInt(btn.substring(0,1));
		this.timeLeft = parseInt(btn.substring(0,1));
		this.addChild(this.startButton);
		this.removeChild(this.timer3Button);
		this.removeChild(this.timer5Button);
		this.removeChild(this.timer7Button);
	},
	SpriteBallMove: function(event){
		var spriteBall = event.currentTarget
		spriteBall.x += this.dx;
		spriteBall.y += this.dy;
		if(spriteBall.x >= 640 || spriteBall.x<=0)
			this.dx = -this.dx;
		if(spriteBall.y >= 832 || spriteBall.y<= 0)
			this.dy = -this.dy;
	},
	MoveSpider: function(event){
		this.spriteSheetAnim.play();
		if(event.keyCode == 37)
			this.turn = "left";
		if(event.keyCode == 39)
			this.turn = "right";
		if(event.keyCode == 38)
			this.forward = true;
		
		;
	},
	updateSpider: function(event){
		var spider = event.currentTarget;
		var rgbnum = "";
		var red = 0;
		var green = 0;
		var blue = 0;
		this.timeLeft-=1/100;
		if(this.forward == true){
			spider.x -= 3*(Math.cos((spider.rotation+90)*Math.PI/180));
			spider.y -= 3*(Math.sin((spider.rotation+90)*Math.PI/180));
		}
		if(this.turn == "left")
			spider.rotation -= 3;
		if(this.turn == "right")
			spider.rotation += 3;
		//V made the rotationValue a actual degree number.
		//this.rotationValue.text = spider.rotation%360
		if(spider.getBounds().intersects(this.spriteBall.getBounds(),0.2,0.7)){
			this.hityet = true;
		}
		this.scoreValue.text = "Score:" + this.score;
		this.timeValue.text = "Time Left:" + parseInt(this.timeLeft+1);
		if(this.timeLeft<=0){
			this.removeChild(this.spriteBall);
			this.removeChild(this.spriteSheetAnim);
			this.removeChild(this.scoreValue);
			this.removeChild(this.timeValue);
			this.addChild(this.gameOver);
		}
		if(this.hityet == true){
			
			this.score += 1;
			this.spriteBall.x = (Math.random() * 640);
			this.spriteBall.y = (Math.random() * 832);
			this.hityet = false;	
			red = parseInt(Math.random()*255);
			green = parseInt(Math.random()*255);
			blue = parseInt(Math.random()*255);
			rgbnum = red+","+green+","+blue;
			this.backgroundColor = "rgb("+rgbnum+")";
			this.timeLeft += this.addTime;
			
		}
	},
	
    //Play Animation, executes when the Play button is pressed
    playAnim: function(){
        this.spriteSheetAnim.play();
        this.spriteSheetAnim.x += 100;
    },
    //Stop Animation, executes when the Stop button is pressed
    stopAnim: function(event){
		if(event.keyCode == 38)
			this.forward = false;
		if(event.keyCode == 39 || event.keyCode == 37)
			this.turn = "";
		if(this.forward == false && this.turn == "")
			this.spriteSheetAnim.stop();	
    },

    //24 and 48 FPS, set the playback speed of the object when the button is pressed
    set24FPS: function(){
        this.spriteSheetAnim.fps = 24;
    },
    set48FPS: function(){
        this.spriteSheetAnim.fps = 48;
    },

    //Goto First Frame, executes when the First Frame button is pressed.
    //Jumps to the first animation frame and stops. Alternatively you could
    //use gotoAndPlay to jump to the first frame and keep the animation playing.
    gotoFirstFrame: function(){
        this.spriteSheetAnim.gotoAndStop(1);
    }  
}
extend(GameScreen,TGE.Window);