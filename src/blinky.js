import Vek2D from "./vek2d.js";

class Blinky {

    constructor(x, y) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = document.getElementById('spillCanvas').getContext('2d');

        // definere vektorene for posisjon, rettning
        this.pos = new Vek2D(x * 8 + 8, y * 8);
        this.rettning = new Vek2D(0, 0);
        this.rettningBuffer = new Vek2D(0, 0);

        this.aktivRettning = null;

        this.pacman;
        this.tiles;
    }

    // tegner blinky (rød) på skjermen
    tegn() {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'red'
        this.ctx.arc(this.pos.x + 4 - 16, this.pos.y + 4, 6, 0, 2 * Math.PI);

        this.ctx.fill();
        this.ctx.closePath();
    }

    oppdater(pacman) {
        
        // console.clear()
        // console.log('+++++++++++++++++++++++++++++++++++');
        // console.log('MOT1',this.faaMotsattRettning());
        
        // this.aktivRettning = this.velgRettning(pacman);
        // console.log(this.aktivRettning)
        
        // console.log('MOT2',this.faaMotsattRettning());
        // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');


        switch (this.aktivRettning) {
            case 'opp':
                this.rettningBuffer = new Vek2D(0, -1);
                break;
            case 'høyre':
                this.rettningBuffer = new Vek2D(1, 0);
                break;
            case 'ned':
                this.rettningBuffer = new Vek2D(0, 1);
                break;
            case 'venstre':
                this.rettningBuffer = new Vek2D(-1, 0);
                break;
            default:
                break;
        }


        if ((this.pos.x % 8 === 0 && this.pos.y % 8 === 0)) {
            // skjekker om det er greit å oppdatere rettningen ellers husker den på rettningen så den kan skjekke senere
            this.rettning = new Vek2D(this.rettningBuffer.x, this.rettningBuffer.y)
        }
        this.pos.adder(this.rettning.x, this.rettning.y);



    }

    velgRettning(pacman) {
        let rettninger = ['opp', 'høyre', 'ned', 'venstre'];
        // en filler for å skjekke om den første rettningen er mindre
        let optimaleRettning = [null, Number.POSITIVE_INFINITY];
        let blink = new Vek2D(0, 0);

        let motsattRettning = this.faaMotsattRettning();
        // let strekning = null;
        for (let rettning of rettninger) {
            if (motsattRettning == rettning) {
                continue;
            }
            switch (rettning) {
                case 'opp':

                    if (!this.tiles[Math.floor(this.pos.y / 8) - 1][Math.floor(this.pos.x / 8)].type.vegg) {
                        blink = new Vek2D(
                            pacman.pos.x - this.pos.x,
                            pacman.pos.y - (Math.floor(this.pos.y / 8) - 1) * 8
                        )

                        let strekning = blink.lengde()
                        if (optimaleRettning[1] > strekning) {
                            optimaleRettning = [rettning, strekning]
                        }
                    }
                    // this.tiles[Math.floor(this.pos.y / 8) - 1][Math.floor(this.pos.x / 8)].tegnVegg();
                    break;
                case 'høyre':
                    if (!this.tiles[Math.floor(this.pos.y / 8)][Math.floor(this.pos.x / 8) + 1].type.vegg) {
                        blink = new Vek2D(
                            pacman.pos.x - (Math.floor(this.pos.x / 8) + 1) * 8,
                            pacman.pos.y - this.pos.y
                        )
                        let strekning = blink.lengde()
                        if (optimaleRettning[1] > strekning) {
                            optimaleRettning = [rettning, strekning]
                        }
                    }
                    this.tiles[Math.floor(this.pos.y / 8)][Math.floor(this.pos.x / 8) + 1].tegnVegg()
                    break;
                case 'ned':
                    if (!this.tiles[Math.floor(this.pos.y / 8) + 1][Math.floor(this.pos.x / 8)].type.vegg) {
                        blink = new Vek2D(
                            pacman.pos.x - this.pos.x,
                            pacman.pos.y - (Math.floor(this.pos.y / 8) + 1) * 8,
                        )
                        let strekning = blink.lengde()
                        if (optimaleRettning[1] > strekning) {
                            optimaleRettning = [rettning, strekning]
                        }
                    }
                    this.tiles[Math.floor(this.pos.y / 8) + 1][Math.floor(this.pos.x / 8)].tegnVegg();
                    break;
                case 'venstre':
                    if (!this.tiles[Math.floor(this.pos.y / 8)][Math.floor(this.pos.x / 8) - 1].type.vegg) {
                        blink = new Vek2D(
                            pacman.pos.x - (Math.floor(this.pos.x / 8) - 1) * 8,
                            pacman.pos.y - this.pos.y
                        )
                        let strekning = blink.lengde()
                        if (optimaleRettning[1] > strekning) {
                            optimaleRettning = [rettning, strekning]
                        }
                    }
                    break;
            }
            
            console.log({ optimaleRettning })

            // console.log(optimaleRettning[0])
        }
        return optimaleRettning[0];
    }

    faaMotsattRettning() {
        switch (this.aktivRettning) {
            case 'opp':
                return 'ned';
            case 'høyre':
                return 'venstre';
            case 'ned':
                return 'opp';
            case 'venstre':
                return 'høyre'
        }

    }

} export default Blinky


