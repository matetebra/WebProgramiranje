var i = 0; var br = 0;
export class Proizvodi {
    constructor(tip, maxBrProizovda, brojProizovda, marka) {
   
        this.maxBrProizovda = maxBrProizovda;
        this.brojProizovda = brojProizovda;
        this.tip = tip;

        this.marka = marka;

        this.miniKontejner = null;

        this.listaNaziva = [];
    }

    crtajProizvod(host, host1) {
        this.miniKontejner = document.createElement("button");
        this.miniKontejner.classList.add("butt");
        this.miniKontejner.innerHTML = this.tip + " " + this.brojProizovda + "/" + this.maxBrProizovda;
        host.appendChild(this.miniKontejner);
        
        const kont = document.createElement("label");
        host1.appendChild(kont);

        this.miniKontejner.onclick = (ev) => {
            if (i > 0) {

                while (i > 0) {
                    if (document.getElementById(i)) {
                        var el = document.getElementById(i);

                        document.getElementById(i).remove();
                        i--;

                    }
                    else{
                        i=0;
                    }

                }

            }


            this.listaNaziva.forEach((naziv) => {
                i++;

                naziv.crtajNaziv(kont, i);

            })

        }
    }

    dodajProizvod(pr) {
        this.listaNaziva.push(pr);
    }
    proveraNaziva(noviNaziv) {
        let pom = false;
        this.listaNaziva.forEach((naziv) => {
            if (noviNaziv.naziv == naziv.naziv) {
                pom = true;
            }
        });
        return pom;
    }
    pronadjiN(naz) {

        let n = this.listaNaziva.find(nazivv => nazivv.naziv == naz);

        return n;
    }
    upisiProizvod(pr) {
        if (this.brojProizovda < this.maxBrProizovda) {

        }
        else {
            alert("Kapacitet je pun!");
        }


    }
    obrisiProizvod(pr) {
        const index = this.listaNaziva.indexOf(pr);
        if (index > -1) {
            this.listaNaziva.splice(index, 1);
            this.brojProizovda--;
          }
    }
}