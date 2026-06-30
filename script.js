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

        platformImg = new Image()
        platformImg.src = 'assets/images/platform.png'
        placePlatForms()
        requestAnimationFrame(update);
        document.addEventListener('keydown', moveDoodler)
    }
}

//Game Physics

let velocityX = 0;

function update(){
    requestAnimationFrame(update)
    context.clearRect(0, 0, board.width, board.height)

    //doodler 
    doodler.x += velocityX;

    if(doodler.x > boardWidth){
        doodler.x = 0
    }
    else if(doodler.x + doodler.width < 0){
        doodler.x = boardWidth
    }
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height)

    for(let i = 0; i < platformArray.length; i++){
        let platform = platformArray[i];
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height)
    }
}

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
    platformArray = []

    let platform = {
        img: platformImg,
        x: boardWidth/2,
        y : boardHeight - 50,
        width: platformWidth,
        height: platformHeight
    }

    platformArray.push(platform)
}