
export class Proizvod {
    constructor(marka, naziv, nazivMagacina, tip) {
        this.marka = marka;
        this.naziv = naziv;
        this.nazivMagacina = nazivMagacina;
        this.tip = tip;
    }
    crtajNaziv(host,br) {
        if (!host)
            throw new Error("Greska u hostu");

        let pom = document.createElement("h3");
        pom.innerHTML = this.marka + " " + this.naziv;
        pom.id=br;
        host.appendChild(pom);
        const razmak = document.createElement("div");
        host.appendChild(razmak);

    }
}