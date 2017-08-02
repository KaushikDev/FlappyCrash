//List of global variables
var gamePiece;
var imageBackground;
var obstacles=[];
var soundCollision;
var soundBackground;
var score;
var gameOverText;
var gamePieceYLoc = window.innerHeight/4;
var gamePieceXLoc = window.innerWidth/10;
	//This function runs first on window load
	function gameBegins(){
		gamePiece = new component(40,40,"batNormal.png", gamePieceXLoc, gamePieceYLoc, "image");
		imageBackground = new component((window.innerWidth),(window.innerHeight/2),"gotham5.jpg", 0, 0, "background");
		soundCollision =  new Audio("collision1.mp3");
		soundBackground = new Audio("darkKnightTheme.mp3");
		soundBackground.play();
		score = new component("30px", "Arial", "white", window.innerWidth/50, window.innerHeight/30, "text");
		gameOverText = new component("40px", "Arial", "white", window.innerWidth/3, window.innerHeight/4, "text");
		gamingArea.start();
	}
	
	//constructor for creating the gamePiece
	function component(width, height, color, x, y, type){
		this.type = type;
		if(type=="image" || type=="background"){
			this.image = new Image();
			this.image.src = color;
		}
		this.width = width;
		this.height = height;
		this.speedX = 0;
		this.speedY = 0;
		this.x = x;
		this.y = y;
		//creating an update function for component itself
		this.update = function(){
			compCtx = gamingArea.ctx;
			if(type=="image" || type=="background"){
				compCtx.drawImage(this.image, this.x, this.y, this.width, this.height);
				if(type=="background"){
					compCtx.drawImage(this.image, this.x+this.width, this.y, this.width, this.height);
					
				}
			}
			else if(type=="text"){
			compCtx.font = this.width+" "+this.height;
			compCtx.fillStyle = color;
			compCtx.fillText(this.text, this.x, this.y);
			}
			
			else{
				compCtx.fillStyle = color;
				compCtx.fillRect(this.x, this.y, this.width, this.height);
			}
			
			
			
		}
		//function to set new position
		this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;  
			if(this.type=="background"){
				if(this.x==-(this.width)){
					this.x=0;
				}
			}
		},
		
		//function that accounts for crashWith
			this.crashWith = function(otherobj) {
			var myleft = this.x;
			var myright = this.x + (this.width);
			var mytop = this.y;
			var mybottom = this.y + (this.height);
			var otherleft = otherobj.x;
			var otherright = otherobj.x + (otherobj.width);
			var othertop = otherobj.y;
			var otherbottom = otherobj.y + (otherobj.height);
			var crash = true;
			if ((mybottom < othertop) || (mytop > otherbottom) || (			myright < otherleft) || (myleft > otherright)) {
				crash = false;
			}
			return crash;
		}
	}
	//Creating the area(a json object) where all canvas and it's components are and where game is played
	var gamingArea = {
		canvas: document.createElement("canvas"),
		
		//function that defines what happens inside Gaming Area when Game begins
		start:function(){
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight/2;
			this.ctx = this.canvas.getContext("2d");
			document.body.insertBefore(this.canvas, document.body.childNodes[0]);
			//counting frames, strating with 0th one
			this.frameNum=0;
			//Refreshing(e.g. updating the canvas every 10 milliseconds i.e. 100 frames per second.)This also controls the speed the game.
			this.interval = setInterval(updateGamingArea, 6);
			
			//Adding event listeners for mouse clicks and touch screen button press.
			
		},
		//function that clears the gaming area when called.
		clear:function(){
			this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
		},
		
		//function to stop the interval when game piece hits the obstacle
		stop:function(){
		clearInterval(this.interval);
		
		}
	}
	//function returns true if the current framenumber corresponds with the given interval.
	function eachInterval(n){
		if((gamingArea.frameNum/n)%1==0){
			return true;
		}
		return false;
	}
	
	//function that updates the gaming area
	function updateGamingArea(){
		//stopping the game on obstacles hit
		
		for(i = 0; i < obstacles.length; i += 1){
			if(gamePiece.crashWith(obstacles[i])){
				soundCollision.play();
				soundBackground.stop();
				gameOverText.text = "Game Over";
				gameOverText.update();
				//pow begin
					gamePiece.image.src = "pow.png";
					gamePiece.update();
				//pow ends
			    gamingArea.stop();
				
				return;
			}
		
		}
		
		//calling clear inside GamingArea function to update Gaming Area
		gamingArea.clear();
		
		//incrementing new frame and calling new obstacle
		gamingArea.frameNum +=1;
		if(gamingArea.frameNum == 1 || eachInterval(220)){
			x = gamingArea.canvas.width;
			y = gamingArea.canvas.height/5;
			minHeight = 10;
			maxHeight = window.innerHeight/4;
			height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
			height1 = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
			height2 = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
			height3 = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
			
			console.log("height is :" +height);
			//minGap = 50;
			//maxGap = 80;
			   // gap = //Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
				
				//console.log("gap is :" +gap);
				
			var colorObstacle = "hsl("+parseInt(Math.random() * 360, 10) + ",  100%, 50%)";
			obstacles.push(new component(40, 30, "batSignal.png", x,height, "image"));
			obstacles.push(new component(40, 30, "batSignal.png", x,height+90, "image"));
			obstacles.push(new component(40, 30, "batSignal.png", x,height-90, "image"));
			obstacles.push(new component(40, 30, "batSignal.png", x,height+180, "image"));
			obstacles.push(new component(40, 30, "batSignal.png", x,height-180, "image"));
			obstacles.push(new component(40, 30, "batSignal.png", x,height+270, "image"));
			obstacles.push(new component(40, 30, "batSignal.png", x,height-270, "image"));
			
		
		}
		imageBackground.speedX = -1;
		imageBackground.newPos();
		imageBackground.update();
		//moving obstacles and updating
		for (i = 0; i < obstacles.length; i += 1) {
			obstacles[i].x += -1;
			obstacles[i].update();
		}
		
		score.text="Score : "+gamingArea.frameNum;
		
		//calling updates for the all the components
		//gameOverText.update();
		score.update();
		gamePiece.newPos();
		gamePiece.update();
		
}
	function moveup() {
		gamePiece.speedY = -1; 
		gamePiece.image.src = "batUp.png";
	}
	function movedown() {
		gamePiece.speedY = 1; 
		gamePiece.image.src = "batDown.png";
	}
	function moveleft() {
		gamePiece.speedX = -1; 
		gamePiece.image.src = "batBackward.png";
	}
	function moveright() {
		gamePiece.speedX = 1; 
		gamePiece.image.src = "batForward.png";
	}
	function clearmove() {
		gamePiece.speedX = 0; 
		gamePiece.speedY = 0; 
		gamePiece.image.src = "batNormal.png";
	}
	
	function sound(src){
		this.sound = document.createElement("audio");
		this.sound.src = src;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls","none");
		this.sound.style.display="none";
		document.body.appendChild(this.sound);
		this.play = function(){
			this.sound.play();
		}
		this.stop = function(){
			this.sound.pause();
		}
	}
