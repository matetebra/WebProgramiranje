import { Raf } from "./Raf.js"
import { Magacin } from "./Magacin.js"
import { Proizvodi } from "./Proizvodi.js"
import { Proizvod } from "./Proizvod.js"

var d = document.createElement("div");
d.classList.add("da");
document.body.appendChild(d);

var pLabela = document.createElement("label");
pLabela.classList.add("lbl");
pLabela.innerHTML = "Naziv proizvoda: ";
d.appendChild(pLabela);

var pLabela1 = document.createElement("input");
pLabela1.className = "naziv";
pLabela1.classList.add("prikaz");
d.appendChild(pLabela1);

var d1 = document.createElement("div");      
d1.classList.add("da");
document.body.appendChild(d1);

pLabela = document.createElement("label");
pLabela.innerHTML = "Novi naziv proizvoda: ";
d1.appendChild(pLabela);

var pLabela2 = document.createElement("input");
pLabela2.className = "nnaziv";
pLabela2.classList.add("prikaz");
d1.appendChild(pLabela2);

var d2 = document.createElement("div");
d2.classList.add("da");
document.body.appendChild(d2);

var d3 = document.createElement("div");
d3.classList.add("da");
document.body.appendChild(d3);

pLabela = document.createElement("label");
pLabela.innerHTML = "Marka proizvoda: ";
d3.appendChild(pLabela);

var pLabela3 = document.createElement("input");
pLabela3.className = "marka";
pLabela3.classList.add("prikaz");
d3.appendChild(pLabela3);

var d4 = document.createElement("div");
d4.classList.add("da");
document.body.appendChild(d4);

const dugme1 = document.createElement("button");
dugme1.classList.add("bt");
dugme1.innerHTML = "Izmeni proizvod";
d4.appendChild(dugme1);

let opcija = null;
let labela = null;
let divRb = null;
let el = [];
var pLabela = document.createElement("h3");
pLabela.classList.add("lbl");
pLabela.innerHTML = "Odaberite magacin";
document.body.appendChild(pLabela);
fetch("https://localhost:5001/Prodavnica/PreuzmiNaziveMagacina").then(p => {
    p.json().then(data => {
        data.forEach(el => {
            divRb = document.createElement("div");
            opcija = document.createElement("input");
            opcija.type = "radio";
            opcija.name = "radioNazivi";
            opcija.value = el;

            labela = document.createElement("label");
            labela.innerHTML = el;

            divRb.appendChild(opcija);
            divRb.appendChild(labela);
            document.body.appendChild(divRb);

        });
        const dugme = document.createElement("button");
        dugme.innerHTML = "Odaberi";
        dugme.classList.add("bt");
        document.body.appendChild(dugme);
      
        var i=0;
        dugme.onclick = (ev) => {
            const mag = document.body.querySelector(`input[name='${"radioNazivi"}']:checked`);
            if (mag == null) {
                alert("Molimo Vas odaberite magacin");
                return;
            }
            if (document.body.getElementsByClassName(mag.value).length == 0)
            {
            if (document.getElementById("p1") != null)
                {
                    document.getElementById("p1").remove();
                }
            fetch("https://localhost:5001/Prodavnica/PreuzmiMagacin/" + mag.value).then(p => {
                    p.json().then(data => {
                    var pp = document.createElement("div");
                    pp.className="p1";
                    pp.className=mag.value;
                    pp.id="p1";
                    document.body.appendChild(pp);
                    var magacinn = new Magacin(data[0].naziv, data[0].vrsta, data[0].kolona, data[0].brRafova)

                    data[0].proizvodiRafovi.forEach((element) => {
                        var raf = new Raf(element.marka, element.maxBrProizovda, element.brojProizovda)
                            element.rafProizvod.forEach((el) => {
                                var tip = new Proizvodi(el.tip, el.maxBrProizovda, el.brojProizovda, element.marka)
                                    el.proizvod.forEach((e) => {
                                        var proizvod = new Proizvod(element.marka, e.naziv, e.nazivMagacina, el.tip)
                                        tip.dodajProizvod(proizvod)
                                    })
                                raf.dodajTip(tip)
                        })
                        magacinn.dodajRaf(raf)
                    })                
                    magacinn.crtajMagacin(pp)         
                });
            })
            dugme1.onclick = (ev) => {
            
                const markaP = document.body.querySelector(".marka").value;
                const nazivP = document.body.querySelector(".naziv").value;
                const nnazivP = document.body.querySelector(".nnaziv").value;
                if (markaP == "") {
                    alert("Molimo Vas unesite marku prilikom izmene proizvoda");
                    return;
                }
                if (nazivP == "") {
                    alert("Molimo Vas unesite naziv prilikom izmene proizvoda");
                    return;
                }
                if (nnazivP == "") {
                    alert("Molimo Vas unesite naziv prilikom izmene proizvoda");
                    return;
                }
    
                                            fetch("https://localhost:5001/Prodavnica/IzmeniProizvod/" + nazivP + "/" + markaP, {
                                                method: "PUT",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({
                                                    naziv: nnazivP,
                                                    nazivMagacina: mag.value,
                                                })
                                            }).then(p => {
                                                if (p.ok) {
    
                                                   location.reload();
    
                                                }
                                                else {
                                                    alert("Input all informations.");
                                                }
                                            }).catch(p => {
                                                console.log("Error: " + p);
                                            });
                }
            }                                       
        }

    });
});
