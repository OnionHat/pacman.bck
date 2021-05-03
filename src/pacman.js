import Vek2D from './vek2d.js'

class Pacman {
    constructor(x, y) {
        // let c = document.getElementById('spillCanvas');
        /** @type {CanvasRenderingContext2D} */
        this.ctx = document.getElementById('spillCanvas').getContext('2d');

        // definere vektorene for posisjon, rettning, sist ønsket rettning
        this.pos = new Vek2D(x * 8, y * 8);
        this.rettning = new Vek2D(0, 0);
        this.rettningBuffer = new Vek2D(0, 0);

        // ender hastigheten på pacman, ble brukt for debugging, PS: må være ett tall som er delelig med 8
        this.hastighet =  2;
    }

    // tegner pacman'en på skjermen
    tegn() {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'yellow'
        this.ctx.arc(this.pos.x + 4 - 16, this.pos.y + 4, 6, 0, 2 * Math.PI);

        this.ctx.fill();
        this.ctx.closePath();
    }

    // oppdaterer posisjonen til pacman
    oppdater(tiles) {
        // ser om den kan rotere 90grader eller om den kan roteter 180grader
        if ((this.pos.x % 8 === 0 && this.pos.y % 8 === 0) || (this.rettning.x + this.rettningBuffer.x === 0 && this.rettning.y + this.rettningBuffer.y === 0)) {

            // teleporter pacman fra den ene siden til den andre siden
            if (tiles[Math.floor(this.pos.y / 8)][Math.floor(this.pos.x / 8)].type.teleportering) {
                if (this.pos.x / 8 === 0) {
                    this.pos.x = (tiles[0].length - 1) * 8;
                } else {
                    this.pos.x = 0;
                }
            }

            // skjekker om det er greit å oppdatere rettningen ellers husker den på rettningen så den kan skjekke senere
            if (!tiles[Math.floor(this.pos.y / 8) + this.rettningBuffer.y][Math.floor(this.pos.x / 8) + this.rettningBuffer.x].type.vegg) {
                this.rettning = new Vek2D(this.rettningBuffer.x, this.rettningBuffer.y)
            }

            // hvis det er en vegg foran pacman stopper den å bevege seg
            if (tiles[Math.floor(this.pos.y / 8) + this.rettning.y][Math.floor(this.pos.x / 8) + this.rettning.x].type.vegg) {
                this.rettning = new Vek2D(0, 0)
            }
        }
        this.pos.adder(this.rettning.x * this.hastighet, this.rettning.y* this.hastighet);
    }

    // ser om pacman står på en dot og hvis ja hvor mange poeng skal den få
    poengTeller(tiles) {
        if (this.pos.x % 8 === 0 && this.pos.y % 8 === 0 && !tiles[Math.floor(this.pos.y / 8)][Math.floor(this.pos.x / 8)].tomrom) {
            tiles[Math.floor(this.pos.y / 8)][Math.floor(this.pos.x / 8)].tomrom = true;
            if (tiles[Math.floor(this.pos.y / 8)][Math.floor(this.pos.x / 8)].type.smaaDot) {
                return 10
            } else if ((tiles[Math.floor(this.pos.y / 8)][Math.floor(this.pos.x / 8)].type.storDot)) {
                return 50
            }
        }
        return 0

    }

    // oppdatere bufferen med tastaturklikk fra brukeren og bruker variablen til å huske sist ønsket rettning
    beveg(x, y) {
        this.rettningBuffer = new Vek2D(x, y)
    }



} export default Pacman