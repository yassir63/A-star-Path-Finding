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

function stop(){
   
        noLoop()
        paused = true;
    
    }

function run(){

        loop();
           paused = false;
          
    }

// var p = document.getElementById("pause");

// p.addEventListener("click", function() {

//       if (!paused) {
//                     noLoop()
//                     paused = true;
//                 } else {
//                     loop();
//                     paused = false;
//                 }
    
// })

// var s = document.getElementById("start");

// s.addEventListener("click", function() {
  

//                loop();
//                paused = false;
          
                 
//   });


document.addEventListener('keypress', (s) => {
    if (s.key == " ") {
      if (!paused) {
        loop();
        paused = false;
    }
}
})



document.addEventListener('keypress', (x) => {
    if (x.key == "S" || x.key == "s") {
      if (!setUp) {
                    setUp = true;
                    loop();
                } else {
                    setUp = false;
                    noLoop();
                    
                }
    }
})






// let start = false;
// document.addEventListener('keypress', (x) => {
//     if (x.key == "S" || x.key == "s") {
//       if (start) {
//                     noLoop()
//                     start = false;
//                 } else {
//                     loop();
//                     start = true;
                    
//                 }
//     }
// })

// const btn = document.querySelector('#btn');        
//         const radioButtons = document.querySelectorAll('input[name="size"]');
//         btn.addEventListener("click", () => {
//             let selectedSize;
//             for (const radioButton of radioButtons) {
//                 if (radioButton.checked) {
//                     selectedSize = radioButton.value;
//                     break;
//                 }
//             }
//             // show the output:
//             output.innerText = selectedSize ? `You selected ${selectedSize}` : `You haven't selected any size`;
//         });

// if not start noLoop();

// ROWS VALUE
let rowsRange = document.getElementById("rows_range");
let rowstext = document.getElementById("txt_rows_range");

rowsRange.value = rows;
rowstext.textContent = rowsRange.value;
rowsRange.addEventListener('mousemove', () => {
    rowstext.textContent = rowsRange.value;
    setup();
});

function setRows() {
    rowstext.textContent = rowsRange.value;
    rows = rowsRange.value;
    return rows;

}

// COLUMNS VALUE :
let colsRange = document.getElementById("cols_range");
let colstext = document.getElementById("txt_cols_range");

colsRange.value = cols;
colstext.textContent = colsRange.value;
colsRange.addEventListener('mousemove', () => {
    colstext.textContent = colsRange.value;
    setup();
});

function setCols() {
    colstext.textContent = colsRange.value;
    cols = colsRange.value;
    return cols;
}
  