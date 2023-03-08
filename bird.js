class Bird{
    constructor() {
        this.x = 300;
        this.y = 400;
        this.velocity = 0;
        this.width = 49;
        this.height = 50;
        this.weight = 1;
        this.currImg;
    }
    update(){
        let curve = Math.sin( angle) * 15;

        if( this.y > canvas.height - (this.height * 3) + curve){ 
            this.y = canvas.height - (this.height * 3) + curve;
            this.velocity = 0;
            
            gameOver();  
        }else{
            this.velocity += this.weight;
            this.velocity *= 0.9;
            this.y += this.velocity;
        }
        if( this.y < 0 + this.height){
            this.y = 0 + this.height;
            this.velocity = 0;
        }
        if( spacePressed && this.y > this.height * 3) this.flap();
    }

    draw(){
        let bird = new Image();
        bird.src = 'Images/sprite.png';
          
        let dWidth = sWidth;
        let dHeight = sHeight;
        ctx.drawImage(bird, sWidth*k, 0, sWidth, sHeight, this.x, this.y, dWidth, dHeight);
        k += 1;
        if (k == 8) {
            k = 0;
        }
    }
    flap(){
        this.velocity -= 2;
    }
}

const bird = new Bird();


let k = 0;
const sWidth = 50;
const sHeight = 50;