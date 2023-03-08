let pipes = [];

class Pipe{
    constructor() {
        this.top = (Math.random() * canvas.height/3) + 100;
        this.bottom = (Math.random() * canvas.height/3) + 100;
        this.x = canvas.width;
        this.width = 100;
        this.counted = false; 
        this.pipe = new Image();
        pipe.src = "Images/pipe.png";
    }

    draw(){
        for( const obj of pipes) {
            // ctx.save(); 
            // ctx.rotate( 180 * Math.PI/180);
            ctx.drawImage(pipe, obj.x, 0, obj.width, obj.top);
            
            // ctx.restore(); 
            ctx.drawImage(pipe, obj.x, canvas.height - obj.bottom, obj.width, obj.bottom);
        }
    }

    update(){
        this.x -= gameSpeed;
        if( !this.counted && this.x < bird.x){
            score++;
            this.counted = true;
        }
        this.draw();
    }
} 

function handlePipes(){
    if( frame % 120 === 0){
        pipes.unshift( new Pipe());
    }
    for( let i=0; i<pipes.length; i++){
        pipes[i].update();
    }
    if( pipes.length > 20){
        pipes.pop( pipes[0]);
    }
}