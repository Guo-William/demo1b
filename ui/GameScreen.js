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
	this.rotationValue;
	this.turn = "";
	this.forward = false;
	//
	//Set background color
    this.backgroundColor = "#039AFF";

    //Just some display text
    this.addChild(new TGE.Text().setup({
        x:320,
        y:100,
        text:"TGE SpriteSheetAnimation Object",
        font:"32px sans-serif",
        color:"#FFF"
    }));

    //*********************************************************
    //******     SET UP SPRITESHEET ANIMATION OBJECT     ******
    //*********************************************************
    /*
        This is where we set up our sprite sheet animation object
        with initial properties and position it on the screen.
    */
    this.spriteSheetAnim = new TGE.SpriteSheetAnimation().setup({
        image:"spriteSheetImg",
        columns:4,
        rows:5,
        totalFrames:19,
        fps:24,
        x: 320,
        y: 240
    });
    this.addChild(this.spriteSheetAnim);
	//allows spider movement
	this.rotationValue = new TGE.Text().setup({
		x:300,
		y:300,
		text:"",
		font:"32px Times New Roman"
		});
	this.addChild(this.rotationValue);
	this.spriteSheetAnim.addEventListener("keyup",this.stopAnim.bind(this));
	this.spriteSheetAnim.addEventListener("keydown",this.MoveSpider.bind(this));
	this.spriteSheetAnim.addEventListener("update",this.updateSpider.bind(this));
/*    //Start the SpriteSheetAnimation Object playing
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
		if(this.forward == true){
			spider.x -= (Math.cos((spider.rotation+90)*Math.PI/180));
			spider.y -= (Math.sin((spider.rotation+90)*Math.PI/180));
		}
		if(this.turn == "left")
			spider.rotation -= 3;
		if(this.turn == "right")
			spider.rotation += 3;
		
		this.rotationValue.text = spider.rotation%360
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