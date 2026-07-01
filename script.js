//board

let board;
let boardWidth = 360;
let boardHeight = 576;
let context;


// Doodler

let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth/2 - doodlerWidth/2;
let doodlerY = boardHeight*7/8 - doodlerHeight;
let doodlerRightImage;
let doodlerLeftImage;

//Platforms

let platformArray = []
let platformWidth = 60;
let platformHeight = 18;
let platformImg;

let score = 0;
let maxScore = 0;
let gameOver = false;
//Game Physics

let velocityX = 0;

let velocityY = 0;//doodler jump speed
let initialVelocityY = -8; // starting velo y
let gravity = 0.4;


let doodler = {
    img: null,
    x: doodlerX,
    y: doodlerY,
    width: doodlerWidth,
    height:doodlerHeight
}

window.onload = function() {
    board = document.getElementById('board')
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d')

    // Loads Images
        doodlerRightImage = new Image();
        doodlerRightImage.src = 'assets/images/doodler-right.png';
        doodler.img = doodlerRightImage;
        doodlerRightImage.onload = function(){
        context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);

        doodlerLeftImage = new Image()
        doodlerLeftImage.src = 'assets/images/doodler-left.png';

        //platform
        velocityY = initialVelocityY;
        platformImg = new Image()
        platformImg.src = 'assets/images/platform.png'
        placePlatForms()
        requestAnimationFrame(update);
        document.addEventListener('keydown', moveDoodler)
    }
}



function update(){
    requestAnimationFrame(update)
    if(gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height)

    //doodler 
    doodler.x += velocityX;

    if(doodler.x > boardWidth){
        doodler.x = 0
    }
    else if(doodler.x + doodler.width < 0){
        doodler.x = boardWidth
    }

    velocityY += gravity;
    doodler.y += velocityY

    if(doodler.y > board.height){
        gameOver = true;
    }
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height)

    //platform

    for(let i = 0; i < platformArray.length; i++){
        let platform = platformArray[i];
        if(velocityY < 0 && doodler.y < boardHeight*3/4){
            platform.y -= initialVelocityY;
        }
        if(detectCollision(doodler, platform) && velocityY >= 0 ){
            velocityY = initialVelocityY
        }
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height)
    }

    while(platformArray.length > 0 && platformArray[0].y >= boardHeight){
        platformArray.shift() //removes first element from the array
        newPlatForms()
    }

    //score

    updateScore()
    context.fillStyle = 'black';
    context.font = '20px sans-serif';
    context.fillText(score, 5, 20);

    if(gameOver){
        context.fillText("Game over: presee 'Space' to restart the game");
    }
}


//move doodler
function moveDoodler(e){
    if(e.code == 'ArrowRight' || e.code == 'KeyD'){
        velocityX = 4;
        doodler.img = doodlerRightImage;
    }

    else if(e.code == 'ArrowLeft' || e.code == 'KeyA'){
        velocityX = -4
        doodler.img = doodlerLeftImage;
    }
} 

function placePlatForms(){
    platformArray = [];

    let platform = {
        img: platformImg,
        x: boardWidth/2,
        y : boardHeight - 50,
        width: platformWidth,
        height: platformHeight
    }
    platformArray.push(platform)


    for(let i = 0; i < 6; i++){
        let randomX = Math.floor(Math.random() * boardWidth*3/4)
        let platform = {
            img: platformImg,
            x: randomX,
            y : boardHeight - 75*i - 150,
            width: platformWidth,
            height: platformHeight
        }

    platformArray.push(platform)

    }

}

function newPlatForms(){
        let randomX = Math.floor(Math.random() * boardWidth*3/4)
        let platform = {
            img: platformImg,
            x: randomX,
            y : -platformHeight,
            width: platformWidth,
            height: platformHeight
        }

    platformArray.push(platform)
}

function detectCollision(a, b){
    return a.x < b.x + b.width && // a's top left corner doesnot reach b's top right corner
           a.x + a.width > b.x && //a's top right corner passes b'r top left corner
           a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y; // a's bottom left corner passes b's top left corner
}

function updateScore(){
    let points = Math.floor(50*Math.random())
    if(velocityY < 0){
        maxScore += points;

        if(score < maxScore){
            score = maxScore;
        }
    }
    else if(velocityY >= 0){
        maxScore -= points
    }
}