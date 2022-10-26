var canvas = document.querySelector(".gamearea");
var ctx = canvas.getContext("2d");
var mySound;
var dir = 'right',
    lastball, food, score = 0;
var balls = [
    {
        x: 40,
        y: 20
    },
    {
        x: 60,
        y: 20
    },
    {
        x: 80,
        y: 20
    },
    {
        x: 100,
        y: 20
    },

];

function gamestart() {
    foodcreate();
    ani();
    mySound=new sound("snake.mp3");
}

document.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowRight' && e.key != 'ArrowLaft') {
        dir = 'right';
    } else if (e.key == 'ArrowLeft' && e.key != 'ArrowRight') {
        dir = 'left';
    } else if (e.key == 'ArrowUp' && e.key != 'ArrowDown') {
        dir = 'up';
    } else if (e.key == 'ArrowDown' && e.key != 'ArrowUp') {
        dir = 'down';
    }
})

function foodcreate() {
    food = {
        x: Math.floor(Math.random() * (canvas.width - 30) + 10),
        y: Math.floor(Math.random() * (canvas.height - 30) + 10)
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function add() {
    lastball = balls[balls.length - 1];
    if (dir == 'right') {
        balls.push({
            x: lastball.x + 20,
            y: lastball.y
        });
    } else if (dir == 'left') {
        balls.push({
            x: lastball.x - 20,
            y: lastball.y
        });
    } else if (dir == 'up') {
        balls.push({
            x: lastball.x,
            y: lastball.y - 20
        });
    } else if (dir == 'down') {
        balls.push({
            x: lastball.x,
            y: lastball.y + 20
        });
    }

}

setInterval(ani, 220);



function ani() {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.shift();
    add();
    lastball = balls[balls.length - 1];
    if ((lastball.x < food.x + 20) &&
        (lastball.x + 20 > food.x) &&
        (lastball.y < food.y + 20) &&
        (20 + lastball.y > food.y)) {
        mySound.play();
        add();
        score++;
        foodcreate();
    }

    ctx.fillStyle = "blue";
    for (var i = 0; i < balls.length; i++) {
        let headx=lastball.x,heady=lastball.y;
        var ball = balls[i];
        if (i == balls.length - 1) {
            ctx.fillStyle = "red";
        }
        if (ball.x > canvas.width) {
            ball.x = 0;
        }
        if (ball.y > canvas.height) {
            ball.y = 0;
        }
        if (ball.y < 0) {
            ball.y = canvas.height;
        }
        if (ball.x < 0) {
            ball.x = canvas.width;
        }
        ctx.fillRect(ball.x, ball.y, 20, 20);
    }

    ctx.fillStyle = "orange";
    ctx.fillRect(food.x, food.y, 20, 20);
    ctx.fillStyle = "red";
    ctx.font="30px verdana";
    ctx.fillText("Score : " + score, canvas.width / 2 - 50, 50);
}
gamestart();
