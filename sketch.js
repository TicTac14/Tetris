const gameContainer = document.getElementById('gameContainer');
const scoreValEle = document.getElementById('scoreVal');
const timeEle = document.getElementById('currentTime');
var canvas;
const blockSize = 35;
const pieces = [];
const blocks = [];
var backgroundOpacity = 255;
var pieceSpeed = 20;
var piece;
var score = 0;

function setup(){
    canvas = createCanvas(
        gameContainer.offsetWidth,
        gameContainer.offsetHeight
    );
    canvas.parent("gameContainer");
    pieces.push(new Piece());


}

function draw(){
    background(210, backgroundOpacity);
    drawGrid();


    if (pieces.length == 0){
        pieces.push(new Piece());
    };
    pieces[0].show();
    pieces[0].update();

    blocks.forEach(block => {
        block.draw();
    });

    if (pieces[0].isActive == false){
        const b = pieces[0].getBlocks();
        for (let i = 0; i < 4; i++){
            blocks.push(b[i]);
        }
        pieces.pop();
    };

    if (getFilledRows()){
        removeBlocks(getFilledRows());
    }

    updateTime();
    updateScore();

}

function removeBlocks(arr){
    debugger;
    for (let i = 0; i < arr.length; i++){
        blocks.splice(blocks.indexOf(arr[i]), 1);
    }
    
    const row = arr[0].pos.y;
    
    for (let i = 0 ; i < blocks.length; i++){
        if (blocks[i].pos.y < row){
            blocks[i].pos.y += blockSize;
            blocks[i].updateVariables();
        }
    }

    score += 125;
    
}



function drawGrid(){

    for (let i = 1; i < height/blockSize; i++){
        stroke(0);
        strokeWeight(2);
        line(0, blockSize * i, width, blockSize*i);
    }
    for (let i = 1; i < width/blockSize; i++){

        stroke(0);
        strokeWeight(2);
        line(i * blockSize, 0, i * blockSize, height);
    }
}

function windowResized(){
    resizeCanvas(gameContainer.offsetWidth,
                gameContainer.offsetHeight);
}

function keyPressed(){
    const activePiece = pieces[pieces.length-1];
    if (key == "ArrowUp"){
        activePiece.turn();
    }else if (key == "ArrowRight"){
        activePiece.moveRight();
        console.log(getFilledRows());
    }else if (key == "ArrowLeft"){
        activePiece.moveLeft();
    }else if (key == "ArrowDown"){
        pieceSpeed = 4; // gets faster :)

        backgroundOpacity = 50;
    }
}

function keyReleased(){
    if (key == "ArrowDown"){
        pieceSpeed = 20;
        backgroundOpacity = 255;
    };
}

function getFilledRows(){
   

    const hashTable = {};

    for (let i = 0; i < blocks.length; i++){
        const row = blocks[i].pos.y/blockSize
        if (hashTable.hasOwnProperty(`${row}`)){
            hashTable[`${row}`].push(blocks[i]);
        }else {
            hashTable[`${row}`] = [blocks[i]]
        }
    }

    for (let row = 0; row <= 19; row++){
        if (hashTable[`${row}`] && hashTable[`${row}`].length == 10){
            return hashTable[`${row}`];
        }
    }

    return null;


}

function updateTime(){
    const time = new Date();
    const hour = Number(time.getHours());
    const mins = time.getMinutes();
    const secs = time.getSeconds();
    const filteredHour = hour <= 12 ? hour : hour - 12;
    const PM_AM = hour <= 12 ?  "AM": "PM";
    timeEle.innerHTML = `${filteredHour} : ${mins} : ${secs}  ${PM_AM}`;
}
function updateScore(){
    scoreValEle.innerHTML = String(score);
}