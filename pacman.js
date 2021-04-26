import Vektor from './vektor.js'

function lerp(point1, point2, epsilion) {    // https://gamedev.stackexchange.com/questions/64449/smooth-movement-in-a-tile-based-game
    return point1 + epsilion * (point2 + point1)
}

//https://spicyyoghurt.com/tutorials/html5-javascript-game-development/images-and-sprite-animations
class Pacman {
    static sx = 0;
    static sy = 0;
    static sw = 16;
    static sh = 16;
    static dw = 16;
    static dh = 16;


    constructor(ctx, x, y, sprite) {
        this.sprite = sprite;

        this.UpImage = new Array(3)
        this.DownImage = new Array(3)
        this.RightImage = new Array(3)
        this.LeftImage = new Array(3)

        this.animasjonIndex = 0;
        this.animasjonTrin = 0.1;

        this.ctx = ctx;

        this.pos = new Vektor(x, y)

        this.vek = new Vektor(0, 0)

        this.vekBuffer = new Vektor(0, 0)
        this.fart = 8;

        this.score = 0;
        this.treffetVeggen = false;
        this.vegg = false;
    }

    setup() {
        let sprite = {
            sx: null,
            sy: null,
            sw: 16,
            sh: 16,
        };
        for (let i = 0; i < 3; i++) {
            this.RightImage[i] = Object.assign({}, sprite);
            this.RightImage[i].sx = 16 * i;
            this.RightImage[i].sy = 0;

            this.LeftImage[i] = Object.assign({}, sprite);
            this.LeftImage[i].sx = 16 * i;
            this.LeftImage[i].sy = 16;

            this.UpImage[i] = Object.assign({}, sprite);
            this.UpImage[i].sx = 16 * i;
            this.UpImage[i].sy = 32;

            this.DownImage[i] = Object.assign({}, sprite);
            this.DownImage[i].sx = 16 * i;
            this.DownImage[i].sy = 48;
        }
    }

    render() {
        let index;

        let bildet;
        // console.log(index, this.animasjonTrin, this.animasjonIndex)

        if (this.vek.x == 1) {
            bildet = this.RightImage;
        }
        else if (this.vek.x == -1) {
            bildet = this.LeftImage;
        }
        else if (this.vek.y == 1) {
            bildet = this.DownImage;
        }
        else if (this.vek.y == -1) {
            bildet = this.UpImage;
        }
        else {
            bildet = this.RightImage
        }

        switch ([Math.abs((this.pos.x + 4) % 8), (this.pos.y + 4) % 8].join(',')) {
            case ('1,0'):
            case ('0,1'):
            case ('0,0'):
                index = 2
                break;
            case ('2,0'):
            case ('0,2'):
            case ('3,0'):
            case ('0,3'):
            case ('7,0'):
            case ('0,7'):
            case ('6,0'):
            case ('0,6'):
                index = 1;
                break;
            case ('4,0'):
            case ('0,4'):
            case ('5,0'):
            case ('0,5'):
                index = 0;
                break;
            default:
                break;
        }

        this.ctx.drawImage(this.sprite,
            bildet[index].sx, bildet[index].sy,                 // hvor selve spriten er i det opprinelige bildet
            bildet[index].sw, bildet[index].sh,                 // hvor stor spriten er i det opprinelige bildet
            this.pos.x, this.pos.y,                             // plaseringen til spriten på canvas
            bildet[index].sw * 0.9, bildet[index].sh * 0.9);    // størelsen på spriten i canvas

    }

    endreVek(vx, vy) {  // function for endring av buffer vektor
        this.vekBuffer.x = vx;
        this.vekBuffer.y = vy;
    }

    beveg() {
        this.pos.x += this.vek.x * this.fart;
        this.pos.y += this.vek.y * this.fart;
    }

    update(tile) {
        if ((this.pos.x + 4) % 8 == 0 && (this.pos.y + 4) % 8 == 0) {
            // console.log('first')
            let pacmanIndex = new Vektor((this.pos.x + 4) / 8, (this.pos.y + 4) / 8) //finner hvilken index pacman ligger på

            let nesteIndex = new Vektor(pacmanIndex.x + this.vekBuffer.x, pacmanIndex.y + this.vekBuffer.y) //neste indexen pacmanen vil bevege seg mot

            if (pacmanIndex.x >= 0 && pacmanIndex.x <= 27) {    // spiser den siste Pelleten før teleporteringen 
                if (!tile[Math.floor(pacmanIndex.x)][Math.floor(pacmanIndex.y)].type.empty) {
                    tile[Math.floor(pacmanIndex.x)][Math.floor(pacmanIndex.y)].type.empty = true;
                    this.score += 1;//add a point
                }
            }

            if (pacmanIndex.x <= 0 || pacmanIndex.x >= 27) {    // tar og ser om pacmanen skal teleportere
                //venter til pacmanen har beveget seg 2 celler og så teleporteres den 2 celler bak spillbrettet
                if (pacmanIndex.x <= -2) {

                    this.pos.x = 29 * 8 - 4;
                }
                else if (pacmanIndex.x >= 29) {
                    this.pos.x = -2 * 8 - 4;
                }
                this.pos.x += this.vek.x * this.fart;
            }
            else {
                if (tile[Math.floor(nesteIndex.x)][Math.floor(nesteIndex.y)].type.wall) {
                    if (!tile[Math.floor(pacmanIndex.x + this.vek.x)][Math.floor(pacmanIndex.y + this.vek.y)].type.wall) {
                        this.beveg();
                        this.treffetVeggen = false;
                    } else {
                        this.treffetVeggen = true;
                    }
                } else {
                    this.treffetVeggen = false;
                    this.vek.endre(this.vekBuffer);
                    this.beveg();
                }
            }
        } else {
            if (this.vekBuffer.x +  this.vek.x === 0 && this.vekBuffer.y + this.vek.y === 0){
                this.vekBuffer.endre(this.vekBuffer);
            }
            this.beveg();
        }
    }
}
export default Pacman;

