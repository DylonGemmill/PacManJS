var x = 8, y = 8;
var i;
var dir = 0;
var xDir = [0, 0, +1, -1];
var yDir = [+1, -1, 0, 0];
var flag = 0;
var flag2 = 0;

var data;

var oldX = 0;
var oldY = 0;

var wallsMatrix = [];
for(i = 0; i < 17; i++) {
    wallsMatrix[i] = new Array(17);
}

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function move(){
    var prevX = 0;
    var prevY = 0;
    
    self.addEventListener("message", function(event) {
        wallsMatrix = event.data.table;
    }, false);
    
    if(flag == 1){
        if(x == 8 && y == 0 && (oldX != 8 || oldY != 16)){
            oldX = x;
            oldY = y;
            
            x = 8;
            y = 16;
        }
        else if(x == 8 && y == 16 && (oldX != 8 || oldY != 0)){
            oldX = x;
            oldY = y;
            
            x = 8;
            y = 0;
        }
        else{
            do{
                flag2 = 0;
                dir = randomInt(4);

                if(x == 8 && y == 8){
                    dir = 3;
                    oldX = 1000;
                }

                prevX = x + xDir[dir];  
                prevY = y + yDir[dir];

                if(oldX == prevX && oldY == prevY){
                    flag2 = 1;
                    continue;
                }

                if(wallsMatrix[prevX][prevY] == 20 || wallsMatrix[prevX][prevY] == 21 || wallsMatrix[prevX][prevY] == 0){
                    oldX = x;
                    oldY = y;

                    x = prevX;
                    y = prevY;
                }
            }while((wallsMatrix[prevX][prevY] != 20 && wallsMatrix[prevX][prevY] != 21 && wallsMatrix[prevX][prevY] != 0) || flag2 == 1);
        }
    }    
     
    data = {
		"x": x,
		"y": y,
	};
	
	postMessage(data);
    
    flag = 1;
    
    setTimeout(move, 400);
}

move();