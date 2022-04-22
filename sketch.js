// Problem with Spacebar not working after S 
//Problem with full black screen when diagonal doesn t find path !
// bug :  doesn t know left or down if diagonal obstacle
// bug : doesn t know last cell

// why not add start and end determination thorugh inputting numbers !
var cols = 60;
var rows = 60;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w,h;
var path = [];
var mode;
let setUp = false;

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

// function heuristic(a,b){


//     y_dist = abs(a.y - b.y);
//     x_dist = abs(a.x - b.x);
//     return max(y_dist, x_dist);

//   }


//Diagonal distance
/*If your map allows diagonal movement you need a different heuristic. The Manhattan distance for (4 east, 4 north)
 will be 8⨉D. However, you could simply move (4 northeast) instead, so the heuristic should be 4⨉D2, where D2 is the 
 cost of moving diagonally.
*/



// function heuristic(a,b){
//   D = 1;
//   D2 = sqrt(2);
//     dx = abs(a.x - b.x)
//     dy = abs(a.y - b.y)
//     return (dx + dy) + (D2 - 2 * D) * min(dx, dy);
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


// function mousePressed() {
//   for (var j = 0; j < mouseY; j++) {
//       for (var i = 0; i < mouseX; i++) {
         
          
//             grid[i][j].show(color(164,64,51));
          
          
//       }
//       console.log(mouseX,mouseY);
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
  this.clicked = false;
  

  if(random(1) < 0.1){
    this.obstacle = true;
  }
  
  
//   let m = {
//     x: mouseX,
//     y: mouseY
// }
//   let x = floor(map(m.x, 0, (rows - 1) * w, 0, rows - 1, true));
//   let y = floor(map(m.y, 0, (cols - 1) * w, 0, cols - 1, true));





  this.show = function(col){
    fill(col);
    if(this.obstacle){
      fill(0);
    } else if(this.clicked){
      fill(243,67,65);
    }
    noStroke();
     rect(this.i*w,this.j*h,w-1,h-1);
    }


  this.addNeighbors = function(grid,mode){
    var i = this.i;
    var j = this.j;
    

    if(mode == 0){


      if (i < cols - 1) {
        this.neighbors.push(grid[i + 1][j]);
      }
      if (i > 0) {
        this.neighbors.push(grid[i - 1][j]);
      }
      if (j < rows - 1) {
        this.neighbors.push(grid[i][j + 1]);
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j - 1]);
      }
      if (i > 0 && j > 0) {
        this.neighbors.push(grid[i - 1][j - 1]);
      }
      if (i < cols - 1 && j > 0) {
        this.neighbors.push(grid[i + 1][j - 1]);
      }
      if (i > 0 && j < rows - 1) {
        this.neighbors.push(grid[i - 1][j + 1]);
      }
      if (i < cols - 1 && j < rows - 1) {
        this.neighbors.push(grid[i + 1][j + 1]);
      }




      // if(i<cols-1){
      //   this.neighbors.push(grid[i+1][j]);
      //   this.neighbors.push(grid[i+1][j+1]);
      //   // this.neighbors.push(grid[i+1][j-1]);
      // }
      // if(i>0){
      //   this.neighbors.push(grid[i-1][j]);
      //   this.neighbors.push(grid[i-1][j-1]);
      // }
  
      // if(j < rows-1){
      //   this.neighbors.push(grid[i][j+1]);
      //   // this.neighbors.push(grid[i-1][j+1]);
      //   // this.neighbors.push(grid[i+1][j+1]);
      // }
  
      // if(j>0){
      //   this.neighbors.push(grid[i][j-1]);
      //   // this.neighbors.push(grid[i][j-1]);
      // }
      // if(i<cols-1){
      //   this.neighbors.push(grid[i+1][j]);
      //   this.neighbors.push(grid[i+1][j+1]);
      //   // this.neighbors.push(grid[i+1][j-1]);
      // }
      // if(i>0){
      //   this.neighbors.push(grid[i-1][j]);
      //   this.neighbors.push(grid[i-1][j-1]);
      // }


      // // if(i>0){
      // //   this.neighbors.push(grid[i-1][j]);
      // //   this.neighbors.push(grid[i-1][j-1]);
      // // }
      // //  if(j>0){
      // //   this.neighbors.push(grid[i][j-1]);
     
      // // }

      // // if(i<cols-1 && j<rows-1 && i>0 && j>0){
      // //   this.neighbors.push(grid[i+1][j]);
      // //   this.neighbors.push(grid[i+1][j+1]);
      // //   this.neighbors.push(grid[i][j+1]);
      // //   if(i>1 && j>1){
      // //     this.neighbors.push(grid[i+1][j-1]);
      // //     this.neighbors.push(grid[i][j-1]);
      // //     this.neighbors.push(grid[i-1][j-1]);
      // //     this.neighbors.push(grid[i-1][j]);
      // //     this.neighbors.push(grid[i-1][j]);
      // //     this.neighbors.push(grid[i-1][j+1]);
      // //   }
      

      // //   if(j < rows-1){
      // //     this.neighbors.push(grid[i][j+1]);
   
      // //   }
      // //   if(i<cols-1){
      // //     this.neighbors.push(grid[i+1][j]);
        
      // //   }
        
      // if(j < rows-1){
      //   this.neighbors.push(grid[i][j+1]);
      //   // this.neighbors.push(grid[i-1][j+1]);
      //   // this.neighbors.push(grid[i+1][j+1]);
      // }
  
      // if(j>0){
      //   this.neighbors.push(grid[i][j-1]);
      //   // this.neighbors.push(grid[i][j-1]);
      // }
    }else{
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
  
}

Spot.prototype.contains = function (x,y){
  return(x*w>this.x && x*w < (this.x*w + this.w) && y*w > this.y*w && y*w < (this.y*w + this.w));
}


function mousePressed() {
  for(var i=0; i < cols; i++){
    for( var j=0; j < rows ; j++ ){
      if(grid[i][j].contains(mouseX,mouseY)){
        grid[i][j].clicked = true;
        console.log("salam");
        
}
}
    }
    // grid[2][3].fill(233,43,32);
    // console.log("salam");
    // grid[mouseX][mouseY].fill(0);
    // grid[2][3].clicked = true;
    // console.log("salam");
    // if(mouseX>this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.w){
    //   console.log("salam");
    // }

    
    
  }

  


function validate() {
  if (document.getElementById('diagonal').checked) {
    openSet = [];
    closedSet = [];
    
     setup(0);
     draw();
  }else{
    openSet = [];
    closedSet = [];
    
      setup(1);
      draw();
  }
}

function setup(mode) {
    createCanvas(500, 500);
    console.log('A star Yassir Amami');
    
    w = width/cols;
    h = height/rows;
  
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
        grid[i][j].addNeighbors(grid,mode);
    }
      }

start = grid[46][15];
if(start.obstacle){
  window.alert("Le point de départ est un Obstacle ! L'algorithme ne commencera pas !");
  return 0;
}
// end = grid[cols-1][rows-1];
end = grid[0][rows-1];
if(end.obstacle){
  window.alert("Le point de d'arrivée est un obstacle, L'algorithme ne trouvera pas de chemin et testera jusqu'à la fin !");
}


openSet.push(start);

console.log(grid); 



noLoop();
      
  }

//   function mousePressed() {
//     for (var j = 0; j < 10; j++) {
//         for (var i = 0; i < 10; i++) {
//             var dis = dist(mouseX, mouseY, x[i], y[j]);
//             if(dis < w/2) col[j * 10 + i] =! col[j * 10 + i];
//         }
//     }
// }



  function draw() {
    
    if(!setUp){
     
    
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
}
  