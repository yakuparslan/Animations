
let dataSet;
let currentMatrix;
let tmin = 0;
let tmax = 50;
let dt = 1;
let currentIndex = 0;


function setup() {
  createCanvas(1000, 1000);
  frameRate(30);
  initializeData();

    
}

  function draw(){
    background(255);
    displayfunc(dataSet[currentIndex], 0.99);
    currentIndex = (currentIndex + 1) % dataSet.length;
  }    



let vertexFunc = (para) => {
    let center = createVector(para[0], para[1]);
    let ratio = para[2];
    let vertices = [];
    let angle = PI / 6;
    
    for (let i = 0; i < 6; i++) {
      let x = ratio * (1 / sqrt(3)) * cos(angle);
      let y = ratio * (1 / sqrt(3)) * sin(angle);
      
      let matrix = new p5.Matrix([[1, -(1/2)], [0, sqrt(3)/2]]);
      let temp = matrix.mult(createVector(-1, 1).mult(center).add(createVector(3, 0)));
      
      vertices.push(createVector(x, y).add(temp));
      
      angle += PI / 3;
    }
    
    return vertices;
  };
  
  let displayfunc = (array, ratio) => {
    translate(width/2,height/2); 
    fill(color(0, 0, 255)); // ColorData["DeepSeaColors"][3]
    stroke(color(0, 255, 255)); // ColorData["DeepSeaColors"][4]
    beginShape();
    let positions = [];
    
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] === 1) {
          let para = [i, j, ratio];
          let vertices = vertexFunc(para);
          for (let k = 0; k < vertices.length; k++) {
            vertex(vertices[k].x, vertices[k].y);
          }
        }
      }
    }
    
    endShape(CLOSE);
  };
  
  // Define stateSet
let stateSet = Array.from({ length: Math.pow(2, 6) }, (_, i) => i.toString(2).padStart(6, '0').split('').map(Number));

// Define gatherTestFunc
let gatherTestFunc = (lst) => {
  let onesIndices = lst.reduce((acc, val, index) => (val === 1) ? acc.concat(index) : acc, []);
  return onesIndices.map(index => [...lst.slice(index), ...lst.slice(0, index)]);
};

// Apply gatherTestFunc to stateSet
let stateClsSet = stateSet.sort((a, b) => {
  let gatheredA = gatherTestFunc(a).map(arr => arr.join(''));
  let gatheredB = gatherTestFunc(b).map(arr => arr.join(''));
  return gatheredA.join('') > gatheredB.join('') ? 1 : -1;
});

function ruleFunc2Comp(neighborArray, step) {
  const stateClsSetHomogeneous = [
    // ... (populate with your data)
  ];
  const seedSet = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
  const pFreeze = [1, 0.2, 0.1, 0, 0.2, 0.1, 0.1, 0, 0.1, 0.1, 1, 1, 0];
  const pMelt = [0, 0.7, 0.5, 0.5, 0, 0, 0, 0.3, 0.5, 0, 0.2, 0.1, 0];

  const cv = neighborArray[1][1];
  const neighborList = [
    neighborArray[0][1], neighborArray[0][2],
    neighborArray[1][2], neighborArray[2][2],
    neighborArray[2][1], neighborArray[1][0]
  ];

  if (neighborList.reduce((sum, val) => sum + val, 0) === 0) {
    return cv;
  }

  const cls = stateClsSetHomogeneous.findIndex((elem) => elem.every((val, index) => val === neighborList[index]));

  const rand = Math.random();

  if (cv === 0) {
    return rand < pFreeze[cls] ? 1 : 0;
  } else {
    return rand > pMelt[cls] ? 1 : 0;
  }
}

function initializeData() {
  let initM = [
    [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
    0
  ];

  dataSet = [];
  currentMatrix = initM;

  for (let t = tmin; t <= tmax; t += dt) {
    dataSet.push([...currentMatrix[0]]);
    currentMatrix[0] = ruleFunc2Comp(currentMatrix[0], t);
  }
}