const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');
let aster = [];
let timer = 0;

const fonImg = new Image();
fonImg.src = "/Spaceship/image/fon.png";
const asterImg = new Image();
asterImg.src = "/Spaceship/image/astero.png";




fonImg.onload = function () {
    game();
};


function game() {
    update();
    render();
    requestAnimationFrame(game);
};

function update() {
    timer++;
    if (timer % 30 == 0) {
        aster.push({
            x: Math.random()*600,
            y: -50,
            dx: Math.random()*2-1,
            dy: Math.random()*2+2
        });
    };

    //phisics
    for (let i in aster) {
        aster[i].x += aster[i].dx;
        aster[i].y += aster[i].dy;


        //Border

        if (aster[i].x >= 550 || aster[i].x < 0) { aster[i].dx = -aster[i].dx };
        if (aster[i].y >= 550) { aster[i].dy = -aster[i].dy };
    }
};

function render() {
    context.drawImage(fonImg, 0, 0, 600, 600);
    for (let i in aster) {
        context.drawImage(asterImg, aster[i].x, aster[i].y, 50, 50);
    }

};