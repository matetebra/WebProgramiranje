import { Proizvodi } from "./Proizvodi.js"
export class Raf {
  constructor(marka, maxBrProizovda, brojProizovda) {
    
    this.maxBrProizovda = maxBrProizovda;
    this.marka = marka;
    this.brojProizovda = brojProizovda;
    this.kontejner = null;
    this.tipovi = [];

  }
  crtajRaf(host, host1) {
    if (!host)
      throw new Error("Greska u hostu");
    if (!host1)
      throw new Error("Greska u hostu");
    this.kontejner = document.createElement("div");
    this.kontejner.classList.add("kontejner");
    host.appendChild(this.kontejner);
    var j = 0;
    {
      //this.crtajProizvodeNaRafu(this.kontejner, host1);
    }
  }
  crtajProizvodeNaRafu(host1, host) {
    const kontRafa = document.createElement("div");
    kontRafa.classList.add("kontRaf");
    kontRafa.classList.add("kontejnerProizvodi");

    let red=null;
    let mesto;
    let mest;
    let pom = 0;

    red = document.createElement("div");
    red.className = "red";


    var i = 0;
    var p1 = 0;
    var j = this.max / 5;
    if (this.max % 5 != 0) {
      j++;
    }
    for (var p = 0; p < j; p++) {
      var pomocna = document.createElement("div");
      pomocna.id = this.marka + p;

    }

  }
  dodajProizvodi(noviTip) {

    if (!this.pronadjiTip(noviTip)) {
      this.tipovi.push(noviTip);

    }
    else {
      this.tipovi.forEach((tip) => {
        alert("OVaj tip uredjaja vec postoji")
      });
    }
  }
  dodajTip(noviTip) {
    this.tipovi.push(noviTip);
  }
  pronadjiProizvode(t, naz) {
    
    
      let pro;
      let p=this.pronadjiTip(t);
      if(p){
      pro=  p.pronadjiN(naz);
      return pro}
      else return pro=null;
  
  }
  pronadjiTip(t) {
 
   
    let n=this.tipovi.find(tipp=>tipp.tip==t);
       if(n)
       return n;
       else return n=null;

  }
  upisiProizvod(pr) {
    this.tipovi.forEach(tip=>{
      if(tip.tip==pr.tip)
      {
        tip.upisiProizvod(pr);

       
      }
    });
  }
  obrisiProizvod(pr,host){
    var k=this.pronadjiTip(pr.tip);
    k.obrisiProizvod(pr);
    
  }
  obrisiProizvodi(pr){
 
    const index = this.tipovi.indexOf(pr);
  
    if (index > -1) {
        this.tipovi.splice(index, 1);
        this.brojProizovda--;
      }
}
}
