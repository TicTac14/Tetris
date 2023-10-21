class Block {
    constructor(x, y, color){
        this.pos = createVector(x, y);
        this.color = color;
        this.size = blockSize;
        this.topLeftCorner = createVector(this.pos.x, this.pos.y);
        this.topRightCorner = createVector(this.pos.x + this.size, this.pos.y);
        this.bottomLeftCorner = createVector(this.pos.x, this.pos.y + this.size);
        this.bottomRightCorner = createVector(this.pos.x + this.size, this.pos.y + this.size);
        this.centerPoint = createVector(this.pos.x + 0.5*this.size, this.pos.y + 0.5*this.size);
        
        this.speed = 500;
        this.activeBlock = true;
    }


    updateVariables(){
        this.topLeftCorner = createVector(this.pos.x, this.pos.y);
        this.topRightCorner = createVector(this.pos.x + this.size, this.pos.y);
        this.bottomLeftCorner = createVector(this.pos.x, this.pos.y + this.size);
        this.bottomRightCorner = createVector(this.pos.x + this.size, this.pos.y + this.size);
        this.centerPoint = createVector(this.pos.x + 0.5*this.size, this.pos.y + 0.5*this.size);
    }

    moveDown(){
        this.pos.y += this.size;
        this.updateVariables(); 
        
    }


    draw(){
        
        fill(this.color.r, this.color.g, this.color.b);
        rect(this.topLeftCorner.x, this.topLeftCorner.y, this.size, this.size);
    }
}