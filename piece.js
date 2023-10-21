
class Piece {
    constructor(){
        this.colors = [
            {r:255, g:0, b:0},
            {r:0, g:255, b:0},
            {r:0, g:0, b:255},
            {r:3, g:255, b:255},
            {r:255, g:171, b:0},
            {r:255, g:255, b:0},
            {r:255, g:0, b:255},

            
        ];
        this.randomColor = random(this.colors);
        this.shapes = [
            [//L
                new Block(4*blockSize, 2*blockSize, this.randomColor),
                new Block(5*blockSize, 2*blockSize, this.randomColor),
                new Block(6*blockSize, 2*blockSize, this.randomColor),
                new Block(6*blockSize, 1*blockSize, this.randomColor)
            ],
            [//square
                new Block(4*blockSize, 2*blockSize, this.randomColor),
                new Block(5*blockSize, 2*blockSize, this.randomColor),
                new Block(4*blockSize, 3*blockSize, this.randomColor),
                new Block(5*blockSize, 3*blockSize, this.randomColor)
            ],
            [//line
                new Block(4*blockSize, 2*blockSize, this.randomColor),
                new Block(5*blockSize, 2*blockSize, this.randomColor),
                new Block(6*blockSize, 2*blockSize, this.randomColor),
                new Block(7*blockSize, 2*blockSize, this.randomColor)
            ],
            [// reverse L
                new Block(4*blockSize, 2*blockSize, this.randomColor),
                new Block(4*blockSize, 3*blockSize, this.randomColor),
                new Block(5*blockSize, 3*blockSize, this.randomColor),
                new Block(6*blockSize, 3*blockSize, this.randomColor)
            ],
            [// S
                new Block(4*blockSize, 2*blockSize, this.randomColor),
                new Block(5*blockSize, 2*blockSize, this.randomColor),
                new Block(5*blockSize, 1*blockSize, this.randomColor),
                new Block(6*blockSize, 1*blockSize, this.randomColor)
    
            ],
            [// Z
                new Block(4*blockSize, 2*blockSize, this.randomColor),
                new Block(5*blockSize, 2*blockSize, this.randomColor),
                new Block(5*blockSize, 3*blockSize, this.randomColor),
                new Block(6*blockSize, 3*blockSize, this.randomColor)

            ],
            [//wierd one
                new Block(4*blockSize, 2*blockSize, this.randomColor),
                new Block(5*blockSize, 2*blockSize, this.randomColor),
                new Block(5*blockSize, 1*blockSize, this.randomColor),
                new Block(6*blockSize, 2*blockSize, this.randomColor)
    
            ]
            
        ];
        
        this.shapeType = floor(random(0, 7));
        this.rotationPoint = null;

        if (this.shapeType == 2){
            this.rotationPoint = this.shapes[this.shapeType][1].bottomRightCorner;
        }else if (this.shapeType == 3 || this.shapeType == 5){
            this.rotationPoint = this.shapes[this.shapeType][2].centerPoint;
        }else if (this.shapeType == 1){
            this.rotationPoint = this.shapes[this.shapeType][0].bottomRightCorner;
        }else {
            this.rotationPoint = this.shapes[this.shapeType][1].centerPoint;
        }

        this.isActive = true;

        

    }

    show(){
        const s = this.shapes[this.shapeType];
        for (let i = 0; i < s.length; i++){
            s[i].draw();
        }
    }

    //THISSS
    hitBoundaries(){
        const shape = this.shapes[this.shapeType];

        // for (let i = 0; i < 4; i++){
        //     //do for each block in this piece
        //     for (let j = 0; j < pieces.length-1; j++){
        //         // check all other pieces
        //         const curPiece = pieces[j].shapes[pieces[j].shapeType]
        //         for (let n = 0; n < curPiece.length; n++){
        //             //check each block in that piece
        //             if (curPiece[n].topLeftCorner.x == shape[i].bottomLeftCorner.x
        //                 && curPiece[n].topLeftCorner.y == shape[i].bottomLeftCorner.y){
        //                 return true;
        //             }
        //         }
        //     }

        //     if (shape[i].bottomLeftCorner.y == height){
        //         return true;
        //     }
        // }

        for (let i = 0; i < shape.length; i++){
            for (let j = 0; j < blocks.length; j++){
                const curBlock = blocks[j];
                if (shape[i].bottomLeftCorner.x == curBlock.topLeftCorner.x
                    && shape[i].bottomLeftCorner.y == curBlock.topLeftCorner.y){
                        return true;
                }
            }

            if (shape[i].bottomLeftCorner.y == height){
                return true;
            }
        }

        return false;
    }

    getBlocks(){
        return this.shapes[this.shapeType];
    }

    turn(){
        for (let i = 0; i < 4; i++){
            const vect = p5.Vector.sub(this.shapes[this.shapeType][i].centerPoint, this.rotationPoint);
            vect.rotate(PI/2);

            this.shapes[this.shapeType][i].pos = createVector(this.rotationPoint.x + vect.x - blockSize/2, this.rotationPoint.y + vect.y - blockSize/2);
            this.shapes[this.shapeType][i].updateVariables();
        }
        
    }

    update(){
        if (frameCount % pieceSpeed == 0 && this.isActive){
            this.moveDown();
            this.rotationPoint.y += blockSize;
        }
        
        if (this.hitBoundaries()){
            
            this.isActive = false;
        }
        
    }

    moveDown(){
        if (this.isActive){
            this.shapes[this.shapeType].forEach(block => {
                block.moveDown();
            })
        }
    }

    moveRight(){
        for (let i = 0; i < 4; i++){
            const block = this.shapes[this.shapeType][i];
            if (block.topRightCorner.x >= width){
                return;
            }
        }
        for (let i = 0; i < 4; i++){
            const block = this.shapes[this.shapeType][i];
            block.pos.x += blockSize;
            block.updateVariables();
        }
        this.rotationPoint.x += blockSize;

    }

    moveLeft(){
        for (let i = 0; i < 4; i++){
            const block = this.shapes[this.shapeType][i];
            if (block.topLeftCorner.x <= 0){
                return;
            }
        }
        for (let i = 0; i < 4; i++){
            const block = this.shapes[this.shapeType][i];
            block.pos.x -= blockSize;
            block.updateVariables();
        }
        this.rotationPoint.x -= blockSize;

    }
}