class Ghost { // rød spøkelse
    constructor(ctx, x, y, sprite, name) {
        this.ctx = ctx;
        // this.sprite = sprite
        this.name = name;

        this.OppBilde = new Array(2)
        this.NedBilde = new Array(2)
        this.HoyreBilde = new Array(2)
        this.VenstreBilde = new Array(2)

        this.animasjonIndex = 0;
        this.animasjonTrin = 0.25;

        this.pos = {    //posisjonen til spøkelsen
            x: x * 8 - 4,
            y: y * 8 - 4
        };

        this.vek = {    //retningen eller vektorne til spøkelsen
            x: 1,
            y: 0
        };

        this.gjeldendeIndex = {     //indexen spøkelsen ligger på spillbrettet
            x: x,
            y: y
        }

        this.destinasjon;
    }

    oppsett() {
        let spritePosisjon = {
            sx: null,
            sy: null,
            sw: 16,
            sh: 16
        };

        switch (this.name) {
            case 'inky':
                break;
            case 'pinky':
                break;
            case 'blinky':
                spritePosisjon.sy = 64;
                break;
            case 'clyde':
                break;
        }

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
        console.log(this.NedBilde)
    }



    // tegn() {
    //     // let index = Math.floor(this.animasjonIndex) % this.VenstreBilde.length;
    //     let index;
    //     let bildet;
    //     // console.log(index, this.animasjonTrin, this.animasjonIndex)

    //     if (this.vek.x == 1) {
    //         bildet = this.HoyreBilde;
    //     }
    //     else if (this.vek.x == -1) {
    //         bildet = this.VenstreBilde;
    //     }
    //     else if (this.vek.y == 1) {
    //         bildet = this.NedBilde;
    //     }
    //     else if (this.vek.y == -1) {
    //         bildet = this.OppBilde;
    //     }
    //     else {
    //         bildet = this.NedBilde
    //     }

    //     switch ([Math.abs((this.pos.x + 4) % 8), (this.pos.y + 4) % 8].join(',')) {
    //         case ('0,0'):
    //         case ('1,0'):
    //         case ('2,0'):
    //         case ('3,0'):
    //         case ('0,1'):
    //         case ('0,2'):
    //         case ('0,3'):
    //             index = 0;
    //             break;
    //         case ('4,0'):
    //         case ('5,0'):
    //         case ('6,0'):
    //         case ('7,0'):
    //         case ('0,4'):
    //         case ('0,5'):
    //         case ('0,6'):
    //         case ('0,7'):
    //             index = 1;
    //             break;
    //         default:
    //             break;
    //     }





    //     // this.ctx.drawImage(this.sprite,
    //     //     bildet[index].sx, bildet[index].sy,                 // hvor selve spriten er i det opprinelige bildet
    //     //     bildet[index].sw, bildet[index].sh,                 // hvor stor spriten er i det opprinelige bildet
    //     //     this.pos.x, this.pos.y,                             // plaseringen til spriten på canvas
    //     //     bildet[index].sw*0.9, bildet[index].sh*0.9);                // størelsen på spriten i canvas
    //     this.ctx.drawImage(this.sprite, 2, 243, 2, 2, this.pos.x+((8-2.5)/2), this.pos.y + ((8-2.5)/2), 2.5, 2.5);

    //     // this.animasjonIndex += this.animasjonTrin;              // https://www.youtube.com/watch?v=3noMeuufLZY

    //     // console.log(bildet[index], index)

    // }
}

export default Ghost