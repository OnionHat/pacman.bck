class Vektor {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    summer(nyeVektor){
        this.x += nyeVektor.x;
        this.y += nyeVektor.y;
    }

    endre(nyeVektor){
        this.x = nyeVektor.x;
        this.y = nyeVektor.y;
    }
}

export default Vektor;