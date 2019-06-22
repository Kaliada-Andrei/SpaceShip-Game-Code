const canvas = document.querySelector('#game'),
    context = canvas.getContext('2d'),
    valueExpl = document.querySelector('.valueExpl p'),
    ship = { x: 300, y: 400 };
let fire = [],
    aster = [],
    expl = [],
    timer = 0,
    valueExplosion = 0;

//Images
const fonImg = new Image();
fonImg.src = "image/fon.png";
const asterImg = new Image();
asterImg.src = "image/astero.png";
const shipImg = new Image();
shipImg.src = "image/ship01.png";
const fireimg = new Image();
fireimg.src = 'image/fire.png';
const explImg = new Image();
explImg.src = "image/expl222.png";


//Move Ship Mouse
canvas.addEventListener("mousemove", function (event) {
    ship.x = event.offsetX - 15;
    ship.y = event.offsetY - 25;
    if (ship.x >= 550) { ship.x = 550; }
    if (ship.x <= 0) { ship.x = 0; }
    if (ship.y >= 570) { ship.y = 570; }
    if (ship.y <= 0) { ship.y = 0; }
});

//Move Ship Keydown
document.addEventListener('keydown', shipKey);

function shipKey(event) {
    var indexKey = event.keyCode;
    switch (indexKey) {
        case 37: ship.x = ship.x - 10; break;
        case 39: ship.x = ship.x + 10; break;
        case 38: ship.y = ship.y - 10; break;
        case 40: ship.y = ship.y + 10; break;
    }
}

explImg.onload = function () {
    game();
};

function game() {
    update();
    render();
    requestAnimationFrame(game);
};

function update() {
    timer++;
    //Generated asteroids

    if (timer % 20 == 0) {
        aster.push({
            x: Math.random() * 600,
            y: -50,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 + 2,
            del: 0
        });
    }

    //Fire

    //Auto Fire
    // if (timer % 30 == 0) {
    //     fire.push({ x: ship.x + 10, y: ship, dx: 0, dy: -5.2 });
    //     fire.push({ x: ship.x + 10, y: ship, dx: 0.5, dy: -5 });
    //     fire.push({ x: ship.x + 10, y: ship, dx: -0.5, dy: -5 });
    // }

    //Fire keydown
    document.onkeydown = function (event) {
        let fireKey = event.keyCode;
        switch (fireKey) {
            case 32: fire.push({ x: ship.x + 10, y: ship.y, dx: 0, dy: -5.2 });
            case 32: fire.push({ x: ship.x + 10, y: ship.y, dx: 0.5, dy: -5.0 });
            case 32: fire.push({ x: ship.x + 10, y: ship.y, dx: -0.5, dy: -5.0 });
        }
    }

    //Phisics

    //Move fire
    for (i in fire) {
        fire[i].x += fire[i].dx;
        fire[i].y += fire[i].dy;
        if (fire[i].y < - 30) { fire.splice(i, 1); }
    }

    //Animation explosion

    for (let i in expl) {
        expl[i].animx += 0.5;
        if (expl[i].animx > 7) { expl[i].animy++; expl[i].animx = 0 }
        if (expl[i].animy > 7) {
            expl.splice(i, 1);
        }
    }

    //Asteroids
    for (let i in aster) {
        aster[i].x += aster[i].dx;
        aster[i].y += aster[i].dy;

        //Border

        if (aster[i].x >= 600) {
            aster.splice(i, 1, aster.push({
                x: Math.random() * 600,
                y: -50,
                dx: Math.random() * 2 - 1,
                dy: Math.random() * 2 + 2,
                del: 0
            })
            );
        }
        if (aster[i].y >= 600) {
            aster.splice(i, 1, aster.push({
                x: Math.random() * 600,
                y: -50,
                dx: Math.random() * 2 - 1,
                dy: Math.random() * 2 + 2,
                del: 0
            })
            );
        }

        for (let j in fire) {

            if (Math.abs(aster[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(aster[i].y - fire[j].y) < 25) {

                //Spawn explosion
                expl.push({ x: aster[i].x - 25, y: aster[i].y - 25, animx: 0, animy: 0 });

                //Mark asteroid
                aster[i].del = 1;
                fire.splice(i, 1); break;
            }
        }

        //Delet asteroid
        if (aster[i].del == 1) {
            aster.splice(i, 1);
            valueExplosion++;
            valueExpl.innerHTML = "Asteroid Destroyed: " + valueExplosion;
        }
    }
};

function render() {
    context.drawImage(fonImg, 0, 0, 600, 600);
    for (let i in fire) {
        context.drawImage(fireimg, fire[i].x, fire[i].y, 30, 30);
    }
    context.drawImage(shipImg, ship.x, ship.y, 50, 30);
    for (let i in aster) {
        context.drawImage(asterImg, aster[i].x, aster[i].y, 50, 50);
    }
    for (let i in expl) {
        context.drawImage(explImg, 128 * Math.floor(expl[i].animx), 128 * Math.floor(expl[i].animy), 128, 128,
            expl[i].x, expl[i].y, 100, 100);
    }
};

