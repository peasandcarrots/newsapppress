//A lot of this is actually not used at all in the app.  it's from a previous web version.  
//I still need to sort everything out to get the app to work without this, as most of it relates to a canvas game which is not part of the app

var CANVAS_WIDTH = 480;
	var CANVAS_HEIGHT = 330;
	var FPS = 30;
	
	var divNumber = 3;
	
	tweetsAvailable = 75;
	
	var tweetsPushedSoFar = 0;
	
	timeToScroll = 0;
	
	
	batchNumber = 0;
	
	var player = {
	  color: "#00A",
	  x: 50,
	  y: 300,
	  width: 20,
	  height: 30,
	  draw: function() {
	    canvas.fillStyle = this.color;
	    canvas.fillRect(this.x, this.y, this.width, this.height);
	  }
	};
	
	var playerBullets = [];
	
	
	player.shoot = function() {
	  Sound.play("shoot");
	
	  var bulletPosition = this.midpoint();
	
	  playerBullets.push(Bullet({
	    speed: 5,
	    x: bulletPosition.x,
	    y: bulletPosition.y
	  }));
	};
	

	var playerParachutes = [];
	
	player.shootParachute = function() {
	  Sound.play("shoot");
	
	  var parachutePosition = this.midpoint();
	
	  playerParachutes.push(Parachute({
	  speed: 5,
	  x: parachutePosition.x,
	  y: parachutePosition.y
	  }));
	};
	
	
	
	player.midpoint = function() {
	  return {
	    x: this.x + this.width/2,
	    y: this.y + this.height/2
	  };
	};
	
	
	
	
	
	function Bullet(I) {
	  I.active = true;
	
	  I.xVelocity = 0;
	  I.yVelocity = -I.speed;
	  I.width = 3;
	  I.height = 3;
	  I.color = "#000";
	
	  I.inBounds = function() {
	    return I.x >= 0 && I.x <= CANVAS_WIDTH &&
	      I.y >= 0 && I.y <= CANVAS_HEIGHT;
	  };
	
	  I.draw = function() {
	    canvas.fillStyle = this.color;
	    canvas.fillRect(this.x, this.y, this.width, this.height);
	  };
	  
	  I.update = function() {
	    I.x += I.xVelocity;
	    I.y += I.yVelocity;
	
	    I.active = I.active && I.inBounds();
	  };
	
	  I.explode = function() {
	    this.active = false;
	  };
	
	  return I;
	}
	
	 
	
	 function Parachute(P) {
	  P.active = true;
	
	  P.xVelocity = 0;
	  P.yVelocity = -P.speed;
	  P.width = 5;
	  P.height = 5;
	  P.color = "green";
	
	  P.inBounds = function() {
	    return P.x >= 0 && P.x <= CANVAS_WIDTH &&
	      P.y >= 0 && P.y <= CANVAS_HEIGHT;
	  };
	
	  P.draw = function() {
	    canvas.fillStyle = this.color;
	    canvas.fillRect(this.x, this.y, this.width, this.height);
	  };
	  
	  P.update = function() {
	    P.x += P.xVelocity;
	    P.y += P.yVelocity;
	
	    P.active = P.active && P.inBounds();
	  };
	
	  P.attachParachute = function() {
	  
	    this.active = false;
	  };
	
	  return P;
	}
	
	
	
	
	
	
	compNames= ["Are ", "you", "ready", "for ", "the ", "news", "Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news","Are ", "you", "ready", "for ", "the ", "news"];

	
	function setUpCompanies(){
	alert("setting up companies");

	alert(compNames);
	
	
	}
	
	compIndex=0;
	shotCompanies = [];
	enemies = [];
	
	
	function Enemy(I) {
	  I = I || {};
	
	  I.active = true;
	  I.age = Math.floor(Math.random() * 128);
	  
	  I.color = "#A2B";
	  
	  
	  I.parachuteAttached = false;
	  
	      I.compName = compNames[compIndex];
	  
	  I.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
	  I.y = 0;
	  I.xVelocity = 0
	  I.yVelocity = 2;
	
	  I.width = 32;
	  I.height = 32;
	
	  I.inBounds = function() {
	    return I.x >= 0 && I.x <= CANVAS_WIDTH &&
	      I.y >= 0 && I.y <= CANVAS_HEIGHT;
	  };
	
	  I.sprite = Sprite("enemy");
	
	  I.draw = function() {
	  
	  canvas.fillStyle = "white";

	  canvas.font = "8pt Helvetica";
	    this.sprite.draw(canvas, this.x, this.y);
	    canvas.fillText(I.compName, this.x-60, this.y);
	    
	    if (I.parachuteAttached == true){
	    	canvas.fillText("Parachutted", this.x, this.y-4);
	    }
	    
	  };
	
	  I.update = function() {
	  
	  if (I.parachuteAttached == true){
	    	I.xVelocity = 0;
		I.yVelocity = 1;
	    }
	  
	    I.x += I.xVelocity;
	    I.y += I.yVelocity;
	
	    I.xVelocity = 3 * Math.sin(I.age * Math.PI / 64);
	
	    I.age++;
	
	    I.active = I.active && I.inBounds();
	  };
	
	  I.explode = function() {
	    Sound.play("explosion");
	
	    this.active = false;
	  };
	  
	  I.attachParachute = function() {
	    this.parachuteAttached = true;
	    
	  };
	
		compIndex++;
	  return I;
	};
	
	
	
	
	function update() {
	

	if(keydown.shift) {
	    player.shootParachute();
	  }
	
	  if(keydown.ctrl) {
	    player.shoot();
	  }
	
	  if(keydown.left) {
	    player.x -= 5;
	  }
	
	  if(keydown.right) {
	    player.x += 5;
	  }
	
	  player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
	  
	  playerBullets.forEach(function(bullet) {
	    bullet.update();
	  });
	
		
	  playerBullets = playerBullets.filter(function(bullet) {
	    return bullet.active;
	  });
	  
	 playerParachutes.forEach(function(parachute) {
	    parachute.update();
	  });
	  
	  playerParachutes= playerParachutes.filter(function(parachute) {
	    return parachute.active;
	  });
	  
	  
	  enemies.forEach(function(enemy) {
	    enemy.update();
	  });
	
	  enemies = enemies.filter(function(enemy) {
	    return enemy.active;
	  });
	
	  handleCollisions();
	  handleParachuteContact();

	  if(Math.random() < 0.04) {
	    enemies.push(Enemy());
	    tweetsPushedSoFar ++;
	    if (tweetsPushedSoFar >= (tweetsAvailable-15)){
	    
	    
	    
	    if (batchNumber<=50)	    {
	    getTheShite();
	    }
	    
	    }
	  }
	}
	
	
	
	
	function draw() {
	  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	  player.draw();
	  
	  playerBullets.forEach(function(bullet) {
	    bullet.draw();
	  });
	
	playerParachutes.forEach(function(parachute) {
	    parachute.draw();
	  });
	  
	  enemies.forEach(function(enemy) {
	    enemy.draw();
	  });
	}
	
	
	
	function collides(a, b) {
	  return a.x < b.x + b.width &&
	    a.x + a.width > b.x &&
	    a.y < b.y + b.height &&
	    a.y + a.height > b.y;
	}
	
	
	function includeCompanyName(compToInclude, shotOrSaved){
	
	if (shotOrSaved == "shot"){
		var thing = $("#shotCompanies");
		var buttonType = "btn-danger";
		
		category = 'boring';
		
		}
		
	else if (shotOrSaved == "saved")	{
		var thing = $("#savedCompanies");
		var buttonType = "btn-primary";
		category = 'interesting';

		
		}
		
		divName="container" + divNumber;
		divForCompany = "<div class=\"btn "  + buttonType +    " chartDivs\" id= \"" + divName +"\">" + compToInclude+"</div>";
		

		thing.prepend(divForCompany);
		shotCompanies.push(compToInclude);
		bayes.train(compToInclude, category);

		
		divNumber ++;
		return;
	
	}
	
	
	
	function addTopScorers(compToInclude){
	
	
		var thing = $("#third");
		
		
		
	
		
		divName="container" + divNumber;
		divForCompany = "<div class=\"chartDivs\" id= \"" + divName +"\">" + compToInclude+"</div>";
		

		thing.append(divForCompany);
		

		divNumber ++;
		return;
	
	}
	
	
		
	
	function handleCollisions() {
	  playerBullets.forEach(function(bullet) {
	    enemies.forEach(function(enemy) {
	      if(collides(bullet, enemy)) {
		enemy.explode();
		includeCompanyName(enemy.compName, "shot");
		bullet.active = false;
	      }
	    });
	  });
	
	  enemies.forEach(function(enemy) {
	    if(collides(enemy, player)) {
	      enemy.explode();
	      player.explode();
	    }
	  });
	}
	
	
		function handleParachuteContact() {
			playerParachutes.forEach(function(parachute) {
		enemies.forEach(function(enemy) {
		if(collides(parachute, enemy)) {
		enemy.attachParachute();

		includeCompanyName(enemy.compName, "saved");
		parachute.active = false;
		}
		});
		}); 
		
	  
	}
	
	
	player.explode = function() {
	  this.active = false;
	};
	
	player.sprite = Sprite("player");
	
	player.draw = function() {
	  this.sprite.draw(canvas, this.x, this.y);
	};
	
	
	
	
	
	var canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
	 "' height='" + CANVAS_HEIGHT + "'></canvas");
	var canvas = canvasElement.get(0).getContext("2d");
	forC = $("#forCan");
	canvasElement.appendTo(forC);
	
	
	

	
	
	setInterval(function() {
	  update();
	  draw();
	  timeToScroll ++;
	  
	  if (timeToScroll == 50){
	  
			  
	  colouriseByBayesianScore();
	  
	  }
	  
	  if (timeToScroll == 100){
	  autoScroll();
	  }
	}, 1000/FPS);
	
	





