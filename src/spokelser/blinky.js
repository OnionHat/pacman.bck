// import Ghost from './ghost.js'
import Vektor from '../vektor.js'


class Blinky { // rød spøkelse
    constructor(ctx, x, y, sprite) {
        this.pos = new Vektor(x, y)
        this.ctx = ctx;
        this.sprite = sprite;
        this.vek = new Vektor(0, 0);

        this.OppBilde = new Array(2)
        this.NedBilde = new Array(2)
        this.HoyreBilde = new Array(2)
        this.VenstreBilde = new Array(2)

        this.pacmanIndex;
        this.ghostIndex;
        this.luftVektor;
    }

    oppsett() {
        let spritePosisjon = {
            sx: null,
            sy: 64,
            sw: 16,
            sh: 16
        };

        for (let i = 0; i < 2; i++) {

            // bject.assign({}, spritePosisjon) kopierer spritePosisjon objektet slik at jeg kan bruke den på flere steder
            // https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
            this.HoyreBilde[i] = Object.assign({}, spritePosisjon);
            this.HoyreBilde[i].sx = 16 * i;

            this.VenstreBilde[i] = Object.assign({}, spritePosisjon);
            this.VenstreBilde[i].sx = 32 + 16 * i;

            this.OppBilde[i] = Object.assign({}, spritePosisjon);
            this.OppBilde[i].sx = 64 + 16 * i;

            this.NedBilde[i] = Object.assign({}, spritePosisjon);
            this.NedBilde[i].sx = 96 + 16 * i;
        }
        // console.log(this.NedBilde)
    }


    tegn() {
        let [bildet, index] = this.finnAnimasjon();
        // console.log(this.finnAnimasjon());
        // console.log(this.pos)
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.pos.x, this.pos.y, 16 * 0.9, 16 * 0.9)

        this.ctx.fillStyle = 'rgba(0, 230, 0, 0.5)';
        this.ctx.fillRect(this.pacmanIndex.x * 8 - 4, this.pacmanIndex.y * 8 - 4, 16 * 0.9, 16 * 0.9)
        // this.ctx.drawImage(this.sprite, bildet[1].sx, 64, 16, 16, this.pos.x, this.pos.y, 16 * 0.9, 16 * 0.9);
    }


    finnRettnigenMotPacman(pacman, tile) {
        this.pacmanIndex = new Vektor((pacman.pos.x + 4) / 8, (pacman.pos.y + 4) / 8);
        this.ghostIndex = new Vektor((this.pos.x + 4) / 8, (this.pos.y + 4) / 8);

        this.luftVektor = new Vektor(this.pacmanIndex.x - this.ghostIndex.x, this.pacmanIndex.y - this.ghostIndex.y);


        // let luftVektor = new Vektor(pacmanIndex.x - ghostIndex.x, pacmanIndex.y - ghostIndex.y);
        // console.log(luftVektor)

        // return [pacmanIndex, ghostIndex, luftVektor]
    }

    finnTrekk() {
        // 0 -> Opp, 1 -> Høyre, 2 -> Ned, 3 -> Venstre 
        console.log(this.luftVektor)
        if (Math.abs(this.luftVektor.x) < Math.abs(this.luftVektor.y) && this.luftVektor.x > 0) { // hvis X er kortest
            if (Math.sign(this.luftVektor.x) === 1) {
                return 'høyre';
            } else {
                return 'venstre';
            }
        } else if (Math.abs(this.luftVektor.y) < Math.abs(this.luftVektor.x) && this.luftVektor.y > 0) { // hvis Y er kortest
            if (Math.sign(this.luftVektor.y) === -1) {
                return 'opp';
            } else {
                return 'ned';
            }
        } else {
            if (Math.sign(this.luftVektor.y) == -1) {
                return 0;
            } else if (Math.sign(this.luftVektor.x) == -1) {
                return 1;
            } else if (Math.sign(this.luftVektor.y) == 1) {
                return 2;
            }
        }
    }


    oppdater(pacman, tile) {
        this.finnRettnigenMotPacman(pacman);
        // let nesteIndex = new Vektor(ghostIndex.x + this.vek.x, ghostIndex.y + this.vek.y)




        // skjekker om luftvektoren ved Y-aksen er lik med luftvektoren ved X-aksen

        let prioritetTrekk = this.finnTrekk();



        console.log(prioritetTrekk);

        if ((this.pos.x + 4) % 8 == 0 && (this.pos.y + 4) % 8 == 0) {
            // console.log(Math.floor(this.ghostIndex.x + this.luftVektor.x))

            if (Math.floor(this.ghostIndex.x + this.luftVektor.x) < 0 || Math.floor(this.ghostIndex.x + this.luftVektor.x) > 27) {
                // console.log('teleport')
            } else {
                if (tile[Math.floor(this.ghostIndex.x + this.luftVektor.x)][this.ghostIndex.y].type.wall) {

                }
                // else if ()



                // console.log('first')
                let nesteIndex = new Vektor(this.ghostIndex.x + this.luftVektor.x, this.ghostIndex.y + this.luftVektor.y) //neste indexen pacmanen vil bevege seg mot

                if (tile[Math.floor(nesteIndex.x)][Math.floor(nesteIndex.y)].type.wall) {
                    if (!tile[Math.floor(this.pacmanIndex.x + this.vek.x)][Math.floor(this.pacmanIndex.y + this.vek.y)].type.wall) {
                        // this.beveg();
                        this.treffetVeggen = false;
                    } else {
                        this.treffetVeggen = true;
                    }
                } else {

                    this.treffetVeggen = false;
                    // this.vek.endre(this.vekBuffer);
                    // this.beveg();
                }
            }
        } else {
            // if (this.vekBuffer.x + this.vek.x === 0 && this.vekBuffer.y + this.vek.y === 0) {
            //     // this.vekBuffer.endre(this.vekBuffer);
            // }
            // this.beveg();
        }
    }

    beveg() {
        this.pos.x += this.vek.x * this.fart;
        this.pos.y += this.vek.y * this.fart;
    }

    finnAnimasjon() {
        let bildet
        if (this.vek.x == 1) {
            bildet = this.HoyreBilde;
        } else if (this.vek.x == -1) {
            bildet = this.VenstreBilde;
        } else if (this.vek.y == 1) {
            bildet = this.NedBilde;
        } else if (this.vek.y == -1) {
            bildet = this.OppBilde;
        } else {
            bildet = this.HoyreBilde;
        }
        let index;
        switch ([Math.abs((this.pos.x + 4) % 8), (this.pos.y + 4) % 8].join(',')) {
            case ('0,0'):
            case ('1,0'):
            case ('2,0'):
            case ('3,0'):
            case ('0,1'):
            case ('0,2'):
            case ('0,3'):
                // console.log('en');
                index = 1;
                break;
            case ('4,0'):
            case ('5,0'):
            case ('6,0'):
            case ('7,0'):
            case ('0,4'):
            case ('0,5'):
            case ('0,6'):
            case ('0,7'):
                // console.log('null');
                index = 0;
                break;
            default:
                break;
        }
        return [bildet, index];
    }

}

export default Blinky