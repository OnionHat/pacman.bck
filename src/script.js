import Blinky from './spokelser/ghost.js'
import Game from './game.js'

var canvas = document.getElementById('canvas');
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');
const scale = 2.5

let stansSpillet = false;





let game = new Game(ctx, scale);
game.setup();
// game.loadSprites();
// game.initSprite();

[[[[]]]]
function mainLoop() {
    if (game.spritesLoaded) {
        if (!stansSpillet){
            game.update();
            game.render();
        }
    } else {
        console.log('waiting to load sprite')
        game.loadSprites();
    }
    // requestAnimationFrame(mainLoop)
}



let interval = setInterval(mainLoop, 1000/  5);


window.addEventListener("keydown", function (e) {
    if (e.defaultPrevented) {
        return; // Should do nothing if the default action has been cancelled
    }

    var handled = false;
    if (e.code === "Enter" || e.code === "Escape") {
        if (!stansSpillet) {
            stansSpillet = true;
        }
        else {
            stansSpillet = false;
        }


        handled = true

    }
    else if (e.code === "ArrowRight" || e.code === "KeyD") {
        // game.pacman.retning.x = 1;
        // game.pacman.retning.y = 0;

        game.pacman.endreVek(1, 0);
stansSpillet = false
        // game.pacman.move(1, 0, game.tilemap);
        handled = true
        return
    }
    else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        // game.pacman.retning.x = -1;
        // game.pacman.retning.y = 0;

        game.pacman.endreVek(-1, 0);
        stansSpillet = false
        // game.pacman.move(-1, 0, game.tilemap);
        handled = true
        return
    }
    else if (e.code === "ArrowDown" || e.code === "KeyS") {
        // game.pacman.retning.x = 0;
        // game.pacman.retning.y = 1;

        game.pacman.endreVek(0, 1);
        stansSpillet = false
        handled = true
        return
    }
    else if (e.code === "ArrowUp" || e.code === "KeyW") {
        // game.pacman.retning.x = 0;
        // game.pacman.retning.y = -1;

        game.pacman.endreVek(0, -1);
        stansSpillet = false
        handled = true
        return
    }
    // else if (e.code === "Space")
    // {
    //     snake.setup();
    //     food.update();
    // }

    if (handled) {
        // Suppress "double action" if event handled
        e.preventDefault();
    }
}, true);

// let blinky = new Blinky()
// console.log(blinky.sprite)
