import Pacman from './pacman.js'
import Vek2D from './vek2d.js'
import Tile from './tile.js'
import Blinky from './blinky.js';

const FPS = 55

class Spill {
    constructor() {
        this.canvas = document.getElementById('spillCanvas');
        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.canvas.getContext('2d');
        this.scale = 2
        this.sprite = document.getElementById('sprite');

        this.brett = {
            sx: 8 * 28 + 4, sy: 0,
            sw: 8 * 28, sh: 8 * 31,
            dx: 0, dy: 0,
            dw: 8 * 28, dh: 8 * 31
        }

        this.pacman;
        this.spokelser = {
            blinky: null
        }

        // laget ved hjelp av programmet tiled fra https://thorbjorn.itch.io/tiled
        // -1 -> tomrom, 0 -> vegg, 1 -> små prikk (10 poeng), 2 -> stor prikk (50 poeng), 3 -> pacman, 4 -> blinky, 10 -> teleport
        this.tileKart = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [10, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 10],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, -1, -1, -1, -1, -1, -1, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 2, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, -1, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]

        this.tiles = [];
        this.poeng = document.getElementById('spillerPoeng');



    }

    oppsett() {
        this.ctx.canvas.width = 8 * 28 * this.scale
        this.ctx.canvas.height = 8 * 31 * this.scale
        this.ctx.scale(this.scale, this.scale)

        this.canvas.style.border = 'green solid 2px'



        // tilekart er har blitt vrid på med x og y, så y er rad
        for (let i = 0; i < this.tileKart.length; i++) {
            this.tiles.push([]);
            for (let j = 0; j < this.tileKart[i].length; j++) {
                this.tiles[i].push(new Tile(j, i))

                switch (this.tileKart[i][j]) {
                    case 0:
                        this.tiles[i][j].type.vegg = true
                        break;
                    case 1:
                        this.tiles[i][j].type.smaaDot = true
                        break;
                    case 2:
                        this.tiles[i][j].type.storDot = true
                        break;
                    case 3:
                        this.tiles[i][j].tomrom = true;
                        this.pacman = new Pacman(j, i);
                        break;
                    case 4:
                        this.tiles[i][j].tomrom = true;
                        this.spokelser.blinky = new Blinky(j, i);
                        break;
                    case 10:
                        this.tiles[i][j].type.teleportering = true
                        this.tiles[i][j].tomrom = true;
                        break;
                    default:
                        this.tiles[i][j].tomrom = true;
                        break;
                }
            }
        }
        this.poeng.innerHTML = 0;

        this.spokelser.blinky.pacman = this.pacman;
        this.spokelser.blinky.tiles = this.tiles;

    }

    // kjør
    kjor() {
        this.ctx.drawImage(this.sprite, this.brett.sx, this.brett.sy, this.brett.sw, this.brett.sh, this.brett.dx, this.brett.dy, this.brett.dw, this.brett.dh);
        this.lagRuter();
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].tegn();
            }
        }

        for (const spokelse in this.spokelser) {
            this.spokelser[spokelse].oppdater(this.pacman)
        }

        this.pacman.oppdater(this.tiles);
        this.poeng.innerHTML = Number(this.poeng.innerHTML) + this.pacman.poengTeller(this.tiles);


        for (const spokelse in this.spokelser) {
            this.spokelser[spokelse].tegn()
        }

        this.pacman.tegn();
        // this.spokelser.blinky.velgRettning();
    }

    lagRuter() {
        for (let i = 0; i < this.brett.dw; i += 8) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0)
            this.ctx.lineTo(i, this.brett.dh)
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
            this.ctx.stroke();          // Render the path
            this.ctx.closePath();
        }
        for (let i = 0; i < this.brett.dh; i += 8) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i)
            this.ctx.lineTo(this.brett.dw, i)
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
            this.ctx.stroke();          // Render the path
            this.ctx.closePath();
        }
    }

    spillerInputTast(e) {
        if (e.defaultPrevented) {
            return; // Should do nothing if the default action has been cancelled
        }

        let handled = false;
        switch (e.code) {
            case "Enter":
            case "Escape":
                console.log(0);
                handled = true
                break;
            case "ArrowRight":
            case "KeyD":
                this.pacman.beveg(1, 0);
                handled = true
                break;

            case "ArrowLeft":
            case "KeyA":
                this.pacman.beveg(-1, 0);
                handled = true
                break;

            case "ArrowDown":
            case "KeyS":
                this.pacman.beveg(0, 1);
                handled = true
                break;

            case "ArrowUp":
            case "KeyW":
                this.pacman.beveg(0, -1);
                handled = true
                break;

            default:
                break;
        }

        if (handled) {
            // Suppress "double action" if event handled
            e.preventDefault();
        }
    }
}


// let pos = new Vek2D({ x=10, y=4, ...args} = {})

// console.log({ pos });

let spill = new Spill();
spill.oppsett();
let fpsteller = document.getElementById('FPSteller');
let spillKnapp = document.getElementById('spillKnapp');
let loopKnapp = document.getElementById('loopKnapp');
let loopKnapp8 = document.getElementById('loopKnapp8');
let isPaused = false;

let sistLoop = new Date();
let naaLoop;


//https://stackoverflow.com/a/2001955
let intervall = setInterval(() => {
    naaLoop = new Date();
    fpsteller.innerText = Math.floor(1000 / (naaLoop - sistLoop));
    sistLoop = naaLoop;
    spill.kjor();
}, 1000 / FPS);

spillKnapp.onclick = function () {
    if (!isPaused) {
        clearInterval(intervall);
        isPaused = true;
    } else {
        intervall = setInterval(() => {
            naaLoop = new Date();
            fpsteller.innerText = Math.floor(1000 / (naaLoop - sistLoop));
            sistLoop = naaLoop;
            spill.kjor();
        }, 1000 / FPS);
        isPaused = false;
    }
}

loopKnapp.onclick = function () {
    spill.kjor()
}
loopKnapp8.onclick = function () {
    for (let i = 0; i <8; i++){
        spill.kjor()
    }
}


window.addEventListener("keydown", (e) => {
    spill.spillerInputTast(e);
}, true)