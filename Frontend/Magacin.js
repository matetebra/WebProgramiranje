import { Raf } from "./Raf.js"
import { Proizvodi } from "./Proizvodi.js"
import { Proizvod } from "./Proizvod.js"


export class Magacin {
  constructor(naziv, vrsta, kolona, brRafova) {

    this.naziv = naziv;
    this.Megakontejner = null;
    this.max = vrsta * kolona;
    this.brRafova = brRafova;
    this.vrsta = vrsta;
    this.kolona = kolona;
    this.proizvodiRafovi = [];
  }

  crtajMagacin(host) {
    if (!host)
      throw new Error("Greska u hostu");
    this.Megakontejner = null;
    this.Megakontejner = document.createElement("div");
    this.Megakontejner.classList.add("Megakontejner");
    host.appendChild(this.Megakontejner);

    var pom = document.createElement("div");
    pom.classList.add("a");
    this.crtajFormuSkladisti(this.Megakontejner);

    this.crtajRafove(this.Megakontejner);

  }
  crtajRafove(host) {

    const host1 = document.createElement("div");


    host1.classList.add("a");
    host.appendChild(host1);
    host1.className = "kontejner";
    const kontRafova = document.createElement("div");
    kontRafova.classList.add("a");
    //kontRafova.className = "kontejner";
    host1.appendChild(kontRafova);
    const pom = document.createElement("div");
    pom.classList.add("a");
    pom.className = "pom";
    kontRafova.appendChild(pom);

    let red = null;
    let mesto;
    let mest;
    red = document.createElement("div");

    red.classList.add("red");
    red.classList.add("kontRaf");
    kontRafova.appendChild(red);
    var i = 0;
    var p1 = 0;
    var j = Math.floor(this.trenutno / 6);
    if (this.trenutno % 6 != 0) {
      j++;
    }
    for (var p = 0; p < j; p++) {
      var pomocna = document.createElement("div");
      pom.classList.add("kontejnerProizvodi");
      red.appendChild(pomocna);
      pomocna.id = this.naziv + p;
    }
    this.proizvodiRafovi.forEach((r) => {

      if (i == 6) {
        p1++;
        i = 0;
        
      }
      var pLabela = document.createElement("label");
      pLabela.innerHTML = r.marka;
      red.appendChild(document.getElementById("p1").appendChild(pLabela));
      var div2 = document.createElement("div");
      div2.classList.add("pom");
      red.appendChild(div2);
      r.crtajRaf(document.getElementById("p1"), pom);

      var ii = 0;
      r.tipovi.forEach((tip) => {
        if (ii < r.brojProizovda) {
          if (ii % 5 == 0) {
            p1++;
          }
          tip.crtajProizvod(div2, pom);
          ii++;
        }
  
      });

      i++;
    });
  }
  crtajMestoZaNazive(host) {
    const pom = document.createElement("div");

    host.appendChild(pom);
  }
  dodajRaf(pov) {
    this.proizvodiRafovi.push(pov);

  }
  crtajFormuSkladisti(host) {
    const kont1 = document.createElement("div");
    kont1.className = "kontSkladisti";
    host.appendChild(kont1);

    const kont2 = document.createElement("div");
    kont2.className = "kontSkladisti";
    kont1.appendChild(kont2);

    const kont3 = document.createElement("div");
    kont3.className = "kontSkladisti";
    kont1.appendChild(kont3);

    const kont4 = document.createElement("div");
    kont3.className = "kontSkladisti";
    kont1.appendChild(kont4);

    var pLabela = document.createElement("h3");
    pLabela.classList.add("lbl");
    pLabela.innerHTML = "Unesite podatke proizvoda koji dodajete";
    kont2.appendChild(pLabela);


    var pLabela = document.createElement("label");
    pLabela.innerHTML = "Naziv proizvoda";
    kont2.appendChild(pLabela);

    pLabela = document.createElement("input");
    pLabela.className = "nazivProizvoda"
    kont2.appendChild(pLabela);

    pLabela = document.createElement("label");
    pLabela.innerHTML = "Tip uredjaja:";
    kont2.appendChild(pLabela);

    let op = null;
    let sel = document.createElement("select");
    sel.className = "sel";
    this.proizvodiRafovi.forEach(raf => {
      raf.tipovi.forEach(tip => {
        op = document.createElement("option");
        op.innerHTML = tip.tip;
        op.value = tip.tip;
        sel.appendChild(op);
      })

    })
    kont2.appendChild(sel);

    pLabela = document.createElement("label");
    pLabela.innerHTML = "Marka proizvoda:";
    kont2.appendChild(pLabela);


    let marke = [];
    this.proizvodiRafovi.forEach((raf) => {
      marke.push(raf.marka);
    });


    let opcija = null;
    let labela = null;
    let divRb = null;
    marke.forEach((marka) => {
      divRb = document.createElement("div");
      opcija = document.createElement("input");
      opcija.type = "radio";
      opcija.name = "radioMarke";
      opcija.value = marka;

      labela = document.createElement("label");
      labela.innerHTML = marka;

      divRb.appendChild(opcija);
      divRb.appendChild(labela);
      kont2.appendChild(divRb);
    })
    this.dodajDugme(kont2, "Dodaj proizvod");
    this.dodajDugme(kont2, "Obrisi proizvod");


    pLabela = document.createElement("h3");
    pLabela.classList.add("lbl");
    pLabela.innerHTML = "Unesite tip koji dodajete";
    kont3.appendChild(pLabela);

    pLabela = document.createElement("label");
    pLabela.innerHTML = "Marka uredjaja";
    kont3.appendChild(pLabela);

    //pLabela = document.createElement("input");
    //pLabela.className = "markaUredjajaTip";
    //kont3.appendChild(pLabela);
    let op1 = null;
    let sel1 = document.createElement("select");
    sel1.className = "markaUredjajaTip";
    this.proizvodiRafovi.forEach(raf => {

        op1 = document.createElement("option");
        op1.innerHTML = raf.marka;
        op1.value = raf.marka;
        sel1.appendChild(op1);


    })
    kont3.appendChild(sel1);
    pLabela = document.createElement("label");
    pLabela.innerHTML = "Tip uredjaja:";
    kont3.appendChild(pLabela);

    pLabela = document.createElement("input");
    pLabela.className = "tipUredjajaTip";
    kont3.appendChild(pLabela);

    pLabela = document.createElement("label");
    pLabela.innerHTML = "Maksimalan broj proizvoda:";
    kont3.appendChild(pLabela);

    pLabela = document.createElement("input");
    pLabela.setAttribute("type", "number");
    pLabela.className = "maxPrTip";
    kont3.appendChild(pLabela);

    this.dodajDugmeTip(kont3, "Dodaj tip");
    this.dodajDugmeTip(kont3, "Obrisi tip");

    pLabela = document.createElement("h3");
    pLabela.classList.add("lbl");
    pLabela.innerHTML = "Unesite marku koju dodajete";
    kont3.appendChild(pLabela);

    pLabela = document.createElement("label");
    pLabela.innerHTML = "Marka uredjaja";
    kont3.appendChild(pLabela);

    pLabela = document.createElement("input");
    pLabela.className = "markaUredjajaM";
    kont3.appendChild(pLabela);

    pLabela = document.createElement("label");
    pLabela.innerHTML = "Maksimalan broj proizvoda:";
    kont3.appendChild(pLabela);

    pLabela = document.createElement("input");
    pLabela.setAttribute("type", "number");
    pLabela.className = "maxPrM";
    kont3.appendChild(pLabela);

    this.dodajDugmeMarka(kont3, "Dodaj marku");
    this.dodajDugmeMarka(kont3, "Obrisi marku");
  }

  dodajOpcije(number, name, host, divRb, sel) {
    let labela = document.createElement("label");
    labela.classList.add("lbl");
    labela.innerHTML = name
    divRb.appendChild(labela);
    divRb.appendChild(sel);
    for (let i = 0; i < number; i++) {
      let opcija = document.createElement("option");
      opcija.innerHTML = i;
      opcija.value = i;
      sel.appendChild(opcija);
    }
    host.appendChild(divRb);
  }
  crtajDetalje(host, text) {
    var pLabela = document.createElement("label");
    pLabela.innerHTML = "Naziv proizvoda";
    host.appendChild(pLabela);

    pLabela = document.createElement("input");
    pLabela.className = "nazivProizvoda";
    host.appendChild(pLabela);

    pLabela = document.createElement("label");
    pLabela.innerHTML = "Tip uredjaja:";
    host.appendChild(pLabela);

    pLabela = document.createElement("input");
    pLabela.className = "tipUredjaja";
    host.appendChild(pLabela);

    pLabela = document.createElement("label");
    pLabela.innerHTML = "Marka proizvoda:";
    host.appendChild(pLabela);


    let marke = [];
    this.proizvodiRafovi.forEach((raf) => {
      marke.push(raf.marka);
    });


    let opcija = null;
    let labela = null;
    let divRb = null;
    marke.forEach((marka) => {
      divRb = document.createElement("div");
      opcija = document.createElement("input");
      opcija.type = "radio";
      opcija.name = "radioMarke";
      opcija.value = marka;

      labela = document.createElement("label");
      labela.innerHTML = marka;

      divRb.appendChild(opcija);
      divRb.appendChild(labela);
      host.appendChild(divRb);
    })





  }
  dodajDugmeMarka(host, text) {
    const dugme = document.createElement("button");
    dugme.classList.add("bt");
    dugme.innerHTML = text;
    host.appendChild(dugme);

    dugme.onclick = (ev) => {
      const marka = this.Megakontejner.querySelector(".markaUredjajaM").value;
      const br = parseInt(this.Megakontejner.querySelector(".maxPrM").value);




      if (text == "Dodaj marku") {
        if (marka == "") {
          alert("Molimo Vas unesite marku prilikom dodavanja marke");
          return;
        }
        if (this.Megakontejner.querySelector(".maxPrM").value == "" || br <= 0) {
          alert("Molimo Vas unesite maksimalan broj tipova prilikom dodavanja marke");
          return;
        }
        var mar;
        this.proizvodiRafovi.forEach(raf => {
          if (raf.marka == marka)
            mar = raf.marka;
        });
        if (mar)
          alert("Ova marka se vec nalazi u magacinu ");
        else {
          if (this.trenutno == this.max) {
            alert("Kapacitet magacina je ispunjen");
          }
          else {
            var r = new Raf(marka, br, 0);
            fetch("https://localhost:5001/Prodavnica/UpisRafova/" + this.naziv, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                idRaf: 0,
                marka: marka,
                brojProizovda: 0,
                maxBrProizovda: br,
              })
            }).then(p => {
              if (p.ok) {


                this.proizvodiRafovi.push(r);
                this.trenutno++;
                this.Megakontejner.innerHTML = "";
                this.crtajMagacin(document.body);
                location.reload()
              }
              else if (p.status == 406) {
                alert("Kapacitet magacina je ispunjen.");
              }
            }).catch(p => {
              console.log("Error: " + p);
            });
          }
        }
      }
      else {
        if (text == "Obrisi marku") {
          if (marka == "") {
            alert("Molimo Vas unesite marku prilikom brisanja marke");
            return;
          }
          var mar;
          this.proizvodiRafovi.forEach(raf => {
            if (raf.marka == marka)
              mar = raf.marka;
          });
          if (!mar)
            alert("Ova marka se ne nalazi u magacinu ");
          else {

            let mar2;
            this.proizvodiRafovi.forEach(raf => {
              if (raf.marka == marka)

                mar2 = raf.trenutnoPr;


            });
            var dsadsa = false;
            if (dsadsa == true) {

              alert("Nije moguce obrisati marku ukoliko se u njoj nalaze tipovi");
            }
            else {
              var p = this.naziv + marka;
              var pom;
              var s;
              var i = 0;

              this.proizvodiRafovi.forEach((raf) => {
                if (raf.marka == marka) {
                  s = raf;
                  i++;

                }


              }); const index = this.proizvodiRafovi.indexOf(s);
              

              fetch("https://localhost:5001/Prodavnica/ObrisiRaf/" + marka + "/" + this.naziv, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(p => {
                if (p.ok) {

                  
                  if (index > -1) {
                    this.proizvodiRafovi.splice(index, 1);
                    this.brRafova--;
                  }
                  this.Megakontejner.innerHTML = "";
                  this.crtajMagacin(document.body);
                  location.reload();
                }
                else if (p.status == 406) {
                  alert("Input all informations.");
                }
              }).catch(p => {
                console.log("Error: " + p);
              });
            }
          }
        }

      }
    }
  }
  dodajDugmeTip(host, text) {
    const dugme = document.createElement("button");
    dugme.classList.add("bt");
    dugme.innerHTML = text;
    host.appendChild(dugme);

    dugme.onclick = (ev) => {
      const marka = this.Megakontejner.querySelector(".markaUredjajaTip").value;
      const tip = this.Megakontejner.querySelector(".tipUredjajaTip").value;
      const max = parseInt(this.Megakontejner.querySelector(".maxPrTip").value);

      let pom;
      if (text == "Dodaj tip") {
        if (marka == "") {
          alert("Molimo Vas unesite marku prilikom dodavanja tipa");
          return;
        }
        if (tip == "") {
          alert("Molimo Vas unesite tip prilikom dodavanja tipa");
          return;
        }
        if (this.Megakontejner.querySelector(".maxPrTip").value == "" || max <= 0) {
          alert("Molimo Vas unesite maksimalan broj uredjaja prilikom dodavanja tipa");
          return;
        }
        this.proizvodiRafovi.forEach((raf) => {
          if (raf.marka == marka) {

            pom = raf.pronadjiTip(tip);

          }
        });
        if (pom) {
          alert("Ovaj tip se vec nalazi u magacinu. ");
        }
        else {
          var mar;
          var maxbr;
          this.proizvodiRafovi.forEach(raf => {
            if (raf.marka == marka)
              mar = raf.marka;
              maxbr = raf.maxBrProizovda;
          });
          if (!mar)
            alert("Ova marka se ne nalazi u magacinu ");
          else {
            var l = new Proizvodi(tip, max, 0, marka);
            //var p = this.naziv + marka + tip;
            var sa;
            this.proizvodiRafovi.forEach((raf) => {
              if (raf.marka == marka) {
                sa = raf;
              }
            });
            if (max > maxbr)
            {
              alert("Ne mozete uneti veci broj od maksimalnog");
              return
            }
            fetch("https://localhost:5001/Prodavnica/UpisProizvoda/" + marka, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                idProizvodi: 0,
                maxBrProizovda: max,
                tip: tip,
                proizvod: [],
              })
            }).then(p => {
              if (p.ok) {

                sa.dodajTip(l);
                sa.brojProizovda++;

                this.Megakontejner.innerHTML = "";
                this.crtajMagacin(document.body);
                location.reload();
              }
              else if (p.status == 406) {
                alert("Kapacitet magacina je ispunjen.");

              }
            }).catch(p => {
              console.log("Error: " + p);
            });
          }
        }

      }
      else {
        if (text == "Obrisi tip") {

          if (marka == "") {
            alert("Molimo Vas unesite marku prilikom brisanja tipa");
            return;
          }
          if (tip == "") {
            alert("Molimo Vas unesite tip prilikom brisanja tipa");
            return;
          }
          var mar;
          this.proizvodiRafovi.forEach(raf => {
            if (raf.marka == marka)
              mar = raf.marka;
          });
          if (!mar)
            alert("Ova marka se ne nalazi u magacinu ");
          else {
            var pom1;
            this.proizvodiRafovi.forEach((raf) => {
              if (raf.marka == marka) {
                pom1 = raf.pronadjiTip(tip);
              }
            });
            if (!pom1) {
              alert("Ovaj tip se ne nalazi u magacinu. ");
            }
            else {
              var sadasd = false
              if (sadasd == true) {
                alert("Nije moguce obrisati tip ukoliko se u njemu nalaze proizvodi");
              }

              else {
                var t = this.naziv + marka + tip;
                var s;
                this.proizvodiRafovi.forEach((raf) => {
                  if (raf.marka == marka) {
                    s = raf.pronadjiTip(tip);
                  }
                });


                fetch("https://localhost:5001/Prodavnica/ObrisiTip/" + tip + "/" + this.naziv, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json"
                  }
                }).then(p => {
                  if (p.ok) {
                    

                    this.obrisiProizvodi(s);
                    this.Megakontejner.innerHTML = "";
                    this.crtajMagacin(document.body);
                    location.reload()
                  }
                  else if (p.status == 406) {
                    alert("Input all informations.");
                  }
                }).catch(p => {
                  console.log("Error: " + p);
                });
              }
            }
          }
        }
      }
    }

  }
  dodajDugme(host, text) {
    const dugme = document.createElement("button");
    dugme.innerHTML = text;
    dugme.classList.add("bt");
    host.appendChild(dugme);
    dugme.onclick = (ev) => {
      const naziv = this.Megakontejner.querySelector(".nazivProizvoda").value;
      const tip = this.Megakontejner.querySelector(".sel").value;
    
      // const tip = this.Megakontejner.querySelector(".tipUredjaja").value;
      const markaa = this.Megakontejner.querySelector(`input[name='${"radioMarke"}']:checked`);
      if (markaa == null) {
        alert("Molimo Vas odaberite marku proizvoda");
        return;
      }
      if (naziv == "") {
        alert("Molimo Vas unesite naziv proizvoda");
        return;
      }
      if (tip == "") {
        alert("Molimo Vas unesite tip proizvoda");
        return;
      }
      const marka = markaa.value;
      let pom;
      if (text == "Dodaj proizvod") {

        this.proizvodiRafovi.forEach((raf) => {
          if (raf.marka == marka) {
            pom = raf.pronadjiProizvode(tip, naziv);

          }
        });
        if (pom) {
          alert("Ovaj proizvod se vec nalazi u magacinu. ");
        }
        else {
          let pom1;
          this.proizvodiRafovi.forEach((raf) => {
            if (raf.marka == marka) {
              pom1 = raf.pronadjiTip(tip);
              
            }

          });
          if (pom1 == null) {
            alert("Ovaj tip ne postoji u magacinu prvo dodajte tip. ");
          }
          else {
            var p = this.naziv + marka + tip + naziv;
            var s = new Proizvod(marka, naziv, this.naziv, tip);
            var r;
            this.proizvodiRafovi.forEach((raf) => {
              if (raf.marka == marka) {
                r = raf.pronadjiTip(tip);

              }
            });

            fetch("https://localhost:5001/Prodavnica/UpisJednogProizvoda/" + tip, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                idProizvod: 0,
                naziv: naziv,
                nazivMagacina: this.naziv,
              })
            }).then(p => {
              if (p.ok) {

                r.listaNaziva.push(s);
                r.brojProizvoda++;
                this.Megakontejner.innerHTML = "";
                this.crtajMagacin(document.body);
                location.reload()
              }
              else if (p.status == 406) {
                alert("Kapacitet magacina je ispunjen.");

              }
            }).catch(p => {
              console.log("Error: " + p);
            });
          }
        }

      }
      else {
        if (text == "Obrisi proizvod") {
          let pom1;
          this.proizvodiRafovi.forEach((raf) => {
            if(marka==raf.marka)
            pom1 = raf.pronadjiTip(tip);

          });
          if (!pom1) {
            alert("Ovaj tip ne postoji u magacinu. ");
          }

          else {
            this.proizvodiRafovi.forEach((raf) => {
              if (raf.marka == marka) {
                pom = raf.pronadjiProizvode(tip, naziv);
              }
            });
            if (!pom) {
              alert("Ovaj proizvod se ne nalazi u magacinu. ");
            }


            else {
              var t = this.naziv + marka + tip + naziv;
              var s;
              var r;
              this.proizvodiRafovi.forEach((raf) => {
                if (raf.marka == marka) {
                  //r=raf.pronadjiTip(raf);
                  s = raf.pronadjiProizvode(tip, naziv);

                }
              });

              fetch("https://localhost:5001/Prodavnica/ObrisiProizvod/" + naziv + "/" + tip + "/" + this.naziv, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(p => {
                if (p.ok) {

                  this.obrisiProizvod(s);


                  this.Megakontejner.innerHTML = "";
                  this.crtajMagacin(document.body);
                  location.reload()

                }
                else if (p.status == 406) {
                  alert("Input all informations.");
                }
              }).catch(p => {
                console.log("Error: " + p);
              });

            }

          }

        }

      }
    }


  }
  obrisiProizvod(pr) {
    this.proizvodiRafovi.forEach(element => {
      if (element.marka == pr.marka)
        element.obrisiProizvod(pr);
    });
  }
  obrisiProizvodi(pr) {
    this.proizvodiRafovi.forEach(element => {
      if (element.marka == pr.marka)
      {
        element.obrisiProizvodi(pr);}
    });
  }
}



