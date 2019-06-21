const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');
const ship = { x: 300, y: 400 };
let fire = [];
let aster = [];
let timer = 0;


const fonImg = new Image();
fonImg.src = "/SpaceShip-Game-Code/image/fon.png";
const asterImg = new Image();
asterImg.src = "/SpaceShip-Game-Code/image/astero.png";
const shipImg = new Image();
shipImg.src = "/SpaceShip-Game-Code/image/ship01.png";
const fireimg = new Image();
fireimg.src = '/SpaceShip-Game-Code/image/fire.png';


//Move Ship
canvas.addEventListener("mousemove", function (event) {
    ship.x = event.offsetX - 15;
    ship.y = event.offsetY - 25;
});

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
    //Generated asteroids

    if (timer % 20 == 0) {
        aster.push({
            x: Math.random() * 600,
            y: -50,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 + 2
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
    document.onkeydown = function(event){
        let fireKey = event.keyCode;
        switch(fireKey){
              case 32:fire.push({x:ship.x+10,y:ship.y,dx:0,dy:-5.2});
              case 32:fire.push({x:ship.x+10,y:ship.y,dx:0.5,dy:-5.0});
              case 32:fire.push({x:ship.x+10,y:ship.y,dx:-0.5,dy:-5.0});
             }
      }

    //Phisics

    //Move fire
    for (i in fire) {
        fire[i].x += fire[i].dx;
        fire[i].y += fire[i].dy;
        if (fire[i].y < - 30) { fire.splice(i, 1); }
    }
    //Asteroids
    for (let i in aster) {
        aster[i].x += aster[i].dx;
        aster[i].y += aster[i].dy;


        //Border

        if(aster[i].x>=600){
            aster.splice(i,1,aster.push({ 
            x:Math.random()*600,
            y:-50,
             dx:Math.random()*2-1,
             dy:Math.random()*2+2,
             del:0
            })
          );}
          if(aster[i].y>=600 ){
             aster.splice(i,1,aster.push({ 
              x:Math.random()*600,
              y:-50,
               dx:Math.random()*2-1,
               dy:Math.random()*2+2,
               del:0
              })
            );}

    }
};

function render() {
    context.drawImage(fonImg, 0, 0, 600, 600);

    for(let i in fire){
        context.drawImage(fireimg, fire[i].x,fire[i].y, 30, 30);
      }

    context.drawImage(shipImg, ship.x, ship.y, 50, 30);
    for (let i in aster) {
        context.drawImage(asterImg, aster[i].x, aster[i].y, 50, 50);
    }


};

