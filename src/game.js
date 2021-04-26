import Pacman from './pacman.js'
import Tile from './tile.js'
import Blinky from './spokelser/blinky.js'

let gridSize = 8;

class Game {
    constructor(ctx, scale) {

        this.ctx = ctx;
        this.scale = scale;

        // Mappen kommer her ifra; https://github.com/kubowania/pac-man/blob/master/app.js, men har modifisert det slik at den passer bildet jeg har.
        this.map = [    // representerer spillbrettet slik at man kan sette det in i en classe 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],      // 1 -> vegger
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],      // 0 -> pellets
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],      // 2 -> tomrom
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],      // 9 -> pacman
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],      // 4 -> blinky
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        this.board;
        this.pacman;
        this.blinky;

        //https://stackoverflow.com/questions/18103234/declare-an-empty-two-dimensional-array-in-javascript
        this.tile = new Array(this.map.length).fill(0).map(() => new Array(this.map[0].length).fill(0));     // lager en 2 dimensjonal Array med 

        this.spillerScore = document.getElementById("score");

        this.spritesheet;
        this.spritesLoaded = false;

    }

    setup() {
        this.spritesheet = document.getElementById('spriteBildet')

        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                this.tile[i][j] = new Tile(this.ctx, (i) * (8), j * 8, this.spritesheet);
                switch (this.map[i][j]) {       //https://www.w3schools.com/js/js_switch.asp
                    case 0:
                        this.tile[i][j].type.dot = true;
                        break;
                    case 1:
                        this.tile[i][j].type.wall = true;
                        break;
                    case 2:
                        this.tile[i][j].type.empty = true;
                        break;
                    case 4:
                        this.tile[i][j].type.empty = true;
                        // this.blinky = new Blinky(this.ctx, i * 8 - 4, j * 8 - 4, this.spritesheet)
                        console.log('i', i, 'j', j)
                        break;
                    case 9:
                        this.tile[i][j].type.empty = true;
                        this.pacman = new Pacman(this.ctx, i * 8 - 4, j * 8 - 4, this.spritesheet);
                        break;
                }
            }
        }
        
        this.pacman.setup();
        
        
        this.blinky = new Blinky(this.ctx, 13 * 8 - 4, 11 * 8 - 4, this.spritesheet)
        this.blinky.oppsett();

        console.log(this.map)
        console.log(this.tile)
        this.board = document.getElementById('brettBildet');
        // this.board = new Image();
        // this.board.src = './images/PacmanBoardGRID.png';

        
        // this.spritesheet.src = './images/PacmanSprites.png';

        this.ctx.canvas.width = this.board.naturalWidth * this.scale;
        this.ctx.canvas.height = this.board.naturalHeight * this.scale;
        this.ctx.scale(this.scale, this.scale)

    }

    loadSprites() {
        // console.log(this.tile.every(e => e.every(v => v)))

        if (this.board.complete && this.spritesheet.complete) {
            this.spritesLoaded = true;
        }
        // if (this.board.complete && this.pacman.image.complete && this.tile.every(e => e.every(v => v.image.complete))) {
        //     // console.log('har')
        //     this.spritesLoaded = true
        // }
    }


    render() {
        this.ctx.drawImage(this.board, 0, 0, this.board.naturalWidth, this.board.naturalHeight);
        for (let i = 0; i < this.tile.length; i++) {
            for (let j = 0; j < this.tile[i].length; j++) {
                // this.ctx.fillStyle = 'rgb(' + Math.floor(255 - 5 * i) + ', ' + Math.floor(255 - 10 * j) + ','+ Math.floor(Math.random()*255)+')';
                // this.ctx.fillRect(this.tile[i][j].pos.x, this.tile[i][j].pos.y, 8, 8)
                this.tile[i][j].render();
            }
        }
        this.blinky.tegn();
        this.pacman.render();
    }

    update() {


        this.pacman.update(this.tile);
        this.blinky.oppdater(this.pacman, this.tile);
        this.spillerScore.innerHTML = 'Score:' + this.pacman.score;
    }
}

export default Game;