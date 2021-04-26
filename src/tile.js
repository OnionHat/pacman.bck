class Tile {
    static sx = 2;
    static sy = 243;
    static sw = 2;
    static dw = 2.5;


    constructor(ctx, x, y, sprite) {
        this.sprite = sprite;
        this.ctx = ctx;
        this.pos = {
            x: x,
            y: y

        };
        this.type = {
            dot: false,
            powerDot: false,
            wall: false,
            empty: false,
        };



    }

    render() {
        if (!this.type.empty) {

            if (this.type.dot) {
                this.ctx.drawImage(this.sprite, Tile.sx, Tile.sy, Tile.sw, Tile.sw, this.pos.x+((8-Tile.dw)/2), this.pos.y + ((8-Tile.dw)/2), Tile.dw, Tile.dw);

            }
            // else if(this.type.wall){
            //     this.ctx.fillStyle = 'red'
            //     this.ctx.fillRect(this.pos.x, this.pos.y, 8, 8)
            // }
        }
    }
}








export default Tile;