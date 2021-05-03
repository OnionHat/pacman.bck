import Vek2D from "./vek2d.js";

class Blinky {

    constructor(x, y, pacman) {
        /** @type {CanvasRenderingContext2D} */
        this.ctx = document.getElementById('spillCanvas').getContext('2d');

        // definere vektorene for posisjon, rettning
        this.pos = new Vek2D(x * 8, y * 8);
        this.rettning = new Vek2D(0, 0);

        this.alleMuligeRettninger = {
            Opp: {verdi: 0, navn: 'Opp', },
            Hoyre: 1,
            Ned: 2,
            Venstre: 3
        };

        this.rettning = this.alleMuligeRettninger.Hoyre;
    }

    // tegner blinky (rød) på skjermen
    tegn() {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'red'
        this.ctx.arc(this.pos.x + 4 - 16, this.pos.y + 4, 6, 0, 2 * Math.PI);

        this.ctx.fill();
        this.ctx.closePath();
        this.faaSortertRettning();
    }

    oppdater() {


    }

    velgRettning(pacman) {
        let motsattRettning = this.faaMotsattRettning();

        let mulligeRettninger = this.faaSortertRettning(motsattRettning);
        console.log({motsattRettning, mulligeRettninger});

    }

    faaMotsattRettning() {
        switch (this.rettning) {
            case this.rettning.Opp:
                return this.rettning.Ned;
            case this.rettning.Hoyre:
                return this.rettning.Venstre;
            case this.rettning.Ned:
                return this.rettning.Opp;
            case this.rettning.Venstre:
                return this.rettning.Hoyre;
        }
    }

    faaSortertRettning(motsattRettning) {

        return this.alleMuligeRettninger.filter((v) => {return v !== motsattRettning})
    }

} export default Blinky