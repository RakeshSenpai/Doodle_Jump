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
        requestAnimationFrame(update);
        document.addEventListener('keydown', moveDoodler)
    }
}

//Game Physics

let velocityX = 0;

function update(){
    requestAnimationFrame(update)

    doodler.x += velocityX;
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height)
}

function moveDoodler(e){
    if(e.code == 'ArrowRight' || e.code == 'keyD'){
        velocityX = 4;
        doodler.img = doodlerRightImage;
    }

    else if(e.code == 'ArrowLeft' || e.code == 'KeyA'){
        velocityX = -4
        doodler.img = doodlerLeftImage;
    }
}