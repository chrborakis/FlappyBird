let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth; 
canvas.height = document.body.clientHeight; 

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 7;
let request;        //animationFrame id

let highScore=0;
if(localStorage.getItem("highScore")){
    highScore = localStorage.getItem("highScore");
}

//Event Listeners
window.addEventListener("keydown", function(e){
    if( e.code === "Space") spacePressed = true;
});

window.addEventListener("keyup", function(e){
    if( e.code === "Space") spacePressed = false;
})

//Init images
let pipe = new Image();             
pipe.src = "Images/pipe.png";
const bang = new Image();
bang.src = "Images/bang.png";
let background = new Image();
background.src = "Images/bg.png";     
background.onload = function () {
    background.width = canvas.width;
    background.height = canvas.height;
    let pattern = ctx.createPattern(this, "repeat");
    ctx.fillStyle = pattern;
    ctx.fill();
    ctx.drawImage(background, 0, 0); 
}

let inputOptions =  {
    7: 'Easy',     
    12: 'Medium',
    20: 'Expert'
}
startGame();
// Start Up Pop Up
function startGame(){
    Swal.fire({         
        imageUrl: 'Images/logo.jpg',
        imageWidth: 500,
        imageHeight: 200,   
        title: 'Flappy Bird',
        text: 'Select difficulty level!',
        width: 500,
        padding: '2em',
        color: 'black',
        input: 'select',
        inputOptions: inputOptions,
        allowOutsideClick: false,
    }).then((result) => {
        gameSpeed = result.value;
        animate();
    });
}

//Game Over Pop Up
function gameOver(){                                        
    Swal.fire({
        icon: 'error',
        title: 'You Lost',
        heightAuto: false,
        text: 'You scored: '+score,
        confirmButtonText: 'Try Again?'
    }).then(function() {
        restart();
    });

    noLoop();
    return true;
}

//Main functionality of game
function animate(){      
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    handlePipes();
    handleParticles();

    bird.update();
    bird.draw();
    displayScore();
    if( highScore>0)displayHighScore();

    //if bird collides to pipe or ground -> stop requestAnimationFrame
    if( handleCollissions() || bird.y > canvas.height - (this.height * 3)) cancelAnimationFrame(request);
    angle+=0.5;
    frame++;
    request = requestAnimationFrame( animate);
}

function restart(){
    if( score>highScore){       //Set new HighScore in localstorage
        localStorage.setItem( "highScore", highScore);
        highScore = score;
    }
    pipes = [];
    bird.y = 300;
    spacePressed = false;
    angle = 0;
    hue = 0;
    frame = 0;
    score = 0;

    startGame();
}

function handleCollissions(){
    for( let i=0; i<pipes.length; i++){
        if( (bird.x < (pipes[i].x + pipes[i].width)) && ((bird.x + bird.width) > pipes[i].x) &&
           ((bird.y < (0 + pipes[i].top) && ((bird.y + bird.height) > 0)) ||
           ((bird.y > (canvas.height - pipes[i].bottom)) && ((bird.y + bird.height) < canvas.height)))){
            ctx.drawImage( bang, bird.x, bird.y, 50, 50);
            
            gameOver();
            return true;
        }
    }
}

function displayScore(){
    ctx.fillStyle = "white";
    ctx.font = "70px Georgia";
    ctx.fillText( "Score: "+ score, canvas.width - 300, 70);
}

function displayHighScore(){
    ctx.fillStyle = "black";
    ctx.font = "70px Georgia";
    ctx.fillText( "Record: "+highScore, 50, 70);
}