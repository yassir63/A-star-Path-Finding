// Problem with Spacebar not working after S 
// why not add start and end determination thorugh inputting numbers !


var cols = 60;
var rows = 60;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];
var mode;
let setUp = false;

function removeFromArray(arr, elmt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elmt) {
      arr.splice(i, 1);
    }
  }
}

// function heuristic(a,b){
//   var d = dist(a.i,a.j,b.i,b.j);  // uses pythagor theoreme but is not that good because of the possible steps to take
//   return d;
// }

function heuristic(a, b) {
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  // var d = dist(a.i,a.j,b.i,b.j);  
  return d; // we can use what is called a manhattan distance or taxi-cab distance
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






function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.neighbors = [];
  this.previous = undefined;
  this.obstacle = false;
  this.clicked = false;


  if (random(1) < 0.3) {
    this.obstacle = true;
  }






  this.show = function (col) {
    fill(col);
    if (this.obstacle) {
      fill(0);
    } else if (this.clicked) {
      fill(243, 67, 65);
    }
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }


  this.addNeighbors = function (grid, mode) {
    var i = this.i;
    var j = this.j;


    if (mode == 0) {


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





    } else {
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
    }





  }

}



function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].clicked = true;
        console.log("salam");

      }
    }
  }


}


function validate() {
  if (document.getElementById('diagonal').checked) {
    openSet = [];
    closedSet = [];

    setup(0);
    draw();
  } else {
    openSet = [];
    closedSet = [];

    setup(1);
    draw();
  }
}

function setup(mode) {
  createCanvas(500, 500);
  console.log('A star Yassir Amami');

  w = width / cols;
  h = height / rows;

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid, mode);
    }
  }

  start = grid[46][15];
  if (start.obstacle) {
    window.alert("Le point de départ est un Obstacle ! L'algorithme ne commencera pas !");
    return 0;
  }
  end = grid[cols - 1][rows - 1];
  if (end.obstacle) {
    window.alert("Le point de d'arrivée est un obstacle, L'algorithme ne trouvera pas de chemin et testera jusqu'à la fin !");
  }


  openSet.push(start);

  console.log(grid);



  noLoop();

}




function draw() {

  if (!setUp) {


    background(0);

    if (openSet.length > 0) {
      var lowestIndex = 0;
      for (var i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }

      var current = openSet[lowestIndex];

      if (current === end) {

        noLoop();
        document.getElementById("result").innerHTML = "PATH FOUND !";

      }


      removeFromArray(openSet, current);
      closedSet.push(current);

      var neighbors = current.neighbors;
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if (!closedSet.includes(neighbor) && !neighbor.obstacle) {
          var tempG = current.g + 1;
          var newPath = false;
          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG; // tempG to check if g of node was smaller in a previous iteration to keep it
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
          if (newPath) {
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }


        }
      }
    } else {

      document.getElementById("result").innerHTML = "PATH NOT FOUND !";
      // no solution !
    }

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].show(color(255));
      }
    }

    for (var i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(255, 0, 0));
    }

    for (var i = 0; i < openSet.length; i++) {
      openSet[i].show(color(0, 255, 0));
    }

    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous); // back tracks the path starting from the end or every frame
      temp = temp.previous;
    }

    for (var i = 0; i < path.length; i++) {
      path[i].show(color(0, 0, 255));
    }
  }
}