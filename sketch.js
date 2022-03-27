var cols = 20;
var rows = 20;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w,h;
var path = [];

function removeFromArray(arr,elmt){
  for(var i = arr.length-1;i>=0;i--){
    if(arr[i] == elmt){
      arr.splice(i,1);
    }
  }
}

// function heuristic(a,b){
//   var d = dist(a.i,a.j,b.i,b.j);  // uses pythagor theoreme but is not that good because of the possible steps to take
//   return d;
// }

function heuristic(a,b){
  var d = abs(a.i-b.i)+abs(a.j-b.j);  
  return d;             // we can use what is called a manhattan distance or taxi-cab distance
}



//Diagonal distance
/*If your map allows diagonal movement you need a different heuristic. The Manhattan distance for (4 east, 4 north)
 will be 8⨉D. However, you could simply move (4 northeast) instead, so the heuristic should be 4⨉D2, where D2 is the 
 cost of moving diagonally.
*/



// function heuristic(a,b){
//     dx = abs(a.x - b.x)
//     dy = abs(a.y - b.y)
//     return (dx + dy) + (D2 - 2 * D) * min(dx, dy)
// }

// let selector = 1;
// // Draw the selector state 
// function drawSelectorState(type, c) {
//   if (settingUp) {
//       let m = {
//           x: mouseX,
//           y: mouseY
//       }

//       push()
//       if (m.x >= 4 * w / 5) {
//           translate(-75, 0)
//       }
//       if (m.y <= h / 5) {
//           translate(0, 25)
//       }
//       // lil square
//       stroke(2);
//       fill(c);
//       rect(m.x + 2, m.y - 17, 15, 15);

//       // lil text :
//       stroke(5);
//       fill(255)
//       textSize(15);
//       text(type, m.x + 20, m.y - 5);
//       pop()
//   }
// }

// // draw the selector state according to the value passed 
// function gizmoSelector(s) {
//   switch (s) {
//       case 1:
//           drawSelectorState("Walkable", 255)
//           break;
//       case 2:
//           drawSelectorState("Obstacle", 0)
//           break;
//       case 3:
//           drawSelectorState("Point A", "blue")
//           break;
//       case 4:
//           drawSelectorState("Point B", "orange")
//           break;
//   }

// }

    

function Spot(i,j){
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.neighbors = [];
  this.previous = undefined;
  this.obstacle = false;

  if(random(1) < 0.3){
    this.obstacle = true;
  }
  

  this.show = function(col){
    fill(col);
    if(this.obstacle){
      fill(0);
    }
    noStroke();
     rect(this.i*w,this.j*h,w-1,h-1);
    }


  this.addNeighbors = function(grid){
    var i = this.i;
    var j = this.j;


    if(i<cols-1){
      this.neighbors.push(grid[i+1][j]);
    }
    if(i>0){
      this.neighbors.push(grid[i-1][j]);
    }

    if(j < rows-1){
      this.neighbors.push(grid[i][j+1]);
    }

    if(j>0){
      this.neighbors.push(grid[i][j-1]);
    }
   
    
    
  }
}

function setup() {
    createCanvas(400, 400);
    console.log('A star Yassir Amami');

    w = width/cols;
    h = height/rows;
    // button = createButton('click me');
    // button.position(0, 0);
    // button.mousePressed(changeBG);
  
      for(var i = 0 ; i< cols;i++){
      grid[i] = new Array(rows);
    }


    for(var i = 0 ; i< cols;i++){
      for(var j=0; j<rows;j++){
        grid[i][j] = new Spot(i,j);
    }
      }

      for(var i = 0 ; i< cols;i++){
      for(var j=0; j<rows;j++){
        grid[i][j].addNeighbors(grid);
    }
      }

start = grid[0][0];
if(start.obstacle){
  window.alert("Le point de départ est un Obstacle ! L'algorithme ne commencera pas !");
  return 0;
}
end = grid[cols-1][rows-1];
if(end.obstacle){
  window.alert("Le point de Départ est un obstacle, L'algorithme ne trouvera pas de chemin et testera jusqu'à la fin !");
}

openSet.push(start);

console.log(grid); 
      
  }

//   let paused = false;
// function keyTyped() {
//     // RESET
//     if ((key === "r" || key == "R") && settingUp) {
//         resetGrid();
//     }
//     // PAUSE
//     if ((key == "p" || key == "¨P") && !settingUp) {
//         if (!paused) {
//             noLoop()
//             paused = true;
//         } else {
//             loop();
//             paused = false;
//         }

//     }

//   }


let paused = false;
document.addEventListener('keypress', (e) => {
    if (e.key == "P" || e.key == "p") {
      if (!paused) {
                    noLoop()
                    paused = true;
                } else {
                    loop();
                    paused = false;
                }
    }
})
  
  function draw() {


    
    background(0);

    if(openSet.length > 0){
      var lowestIndex = 0;
      for (var i=0;i<openSet.length;i++){
        if(openSet[i].f < openSet[lowestIndex].f){
          lowestIndex = i; 
        }
      }

      var current = openSet[lowestIndex];

      if(current === end ){

      noLoop();
        // console.log('Done !!');
        // document.write("PATH FOUND !");
        document.getElementById("result").innerHTML = "PATH FOUND !";

      }

      removeFromArray(openSet,current);
      closedSet.push(current);

      var neighbors = current.neighbors;
      for(var i = 0;i<neighbors.length;i++){
        var neighbor = neighbors[i];
        if(!closedSet.includes(neighbor) && !neighbor.obstacle){
          var tempG = current.g + 1;

          if(openSet.includes(neighbor)){
            if(tempG < neighbor.g){
              neighbor.g = tempG;      // tempG to check if g of node was smaller in a previous iteration to keep it
            }
          }else{
            neighbor.g = tempG;
            openSet.push(neighbor);
          }

          neighbor.h = heuristic(neighbor,end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;

        }
      }
    }else{
      // document.write("PATH NOT FOUND !");
      document.getElementById("result").innerHTML = "PATH NOT FOUND !";
      // no solution !
    }

    for(var i =0 ; i<cols;i++){
      for(var j =0; j<rows ; j++){
        grid[i][j].show(color(255));
      }
    }

    for(var i =0 ; i<closedSet.length;i++){
      closedSet[i].show(color(255,0,0));
    }

    for(var i =0 ; i<openSet.length;i++){
      openSet[i].show(color(0,255,0));      
    }

    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous){
    path.push(temp.previous);   // back tracks the path starting from the end or every frame
    temp = temp.previous;
    }

    for(var i=0;i<path.length;i++){
      path[i].show(color(0,0,255));
    }
  }