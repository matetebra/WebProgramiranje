using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebProjekat.Models;
using Microsoft.EntityFrameworkCore;

namespace WebProjekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdavnicaController : ControllerBase
    {
    
        public ProdavnicaContext Context {get; set;}
        public ProdavnicaController(ProdavnicaContext context)
        {
           Context=context;
        }

        [Route("PreuzmiJedanProizvod")]
        [HttpGet]
        public ActionResult PreuzmiJedanProizvod()
        {
            return Ok (Context.Proizvodi);
        }

        [Route("UpisMagacina")]
        [HttpPost]
        public async Task UpisMagacina([FromBody] Magacin m)
        {
            try
            {
                 m.BrRafova = 0;
                Context.Magacini.Add(m);
                await Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new Exception("Doslo je do greske");
            }
           
        }

        [Route("PreuzmiMagacine")]
        [HttpGet]
        public async Task<List<Magacin>> PreuzmiMagacin()
        {
           return await Context.Magacini.Include(m => m.ProizvodiRafovi).ThenInclude(r=> r.RafProizvod).ThenInclude(pr=> pr.Proizvod).ToListAsync();
        }

        [Route("PreuzmiNaziveMagacina")]
        [HttpGet]
        public ActionResult PreuzmiNaziveMagacina()
        {
           List<string> vrati = new List<string>();
            var mag = Context.Magacini;
            foreach (Magacin m in mag)
            {
                vrati.Add(m.Naziv);
            }
           return Ok(vrati);
        }

        [Route("PreuzmiMagacin/{naziv}")]
        [HttpGet]
        public ActionResult PreuzmiJedanMagacin(string naziv)
        {
           var preuzmi = Context.Magacini.Include(m => m.ProizvodiRafovi).ThenInclude(r=> r.RafProizvod).ThenInclude(pr=> pr.Proizvod).Where(m => m.Naziv == naziv);
           return Ok(preuzmi);
        }

        [Route("UpisRafova/{naziv}")]
        [HttpPost]
        public async Task<IActionResult> UpisRafova(string naziv, [FromBody] Raf r)
        {
            try
            {
                var magacin = await Context.Magacini.FirstOrDefaultAsync(p => p.Naziv == naziv);
                 if (magacin.BrRafova == magacin.Vrsta*magacin.Kolona)
                {
                    return BadRequest("Nema vise mesta!");
                }
                magacin.BrRafova++;
                r.BrojProizovda = 0;
                r.RafProizvod = null;
                r.NazivMagacina = magacin.Naziv;
                r.Magacin = magacin;
                Context.Rafovi.Add(r);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Doslo je do greske");
            }
            
        }

        [Route("UpisProizvoda/{marka}")]
        [HttpPost]
        public async Task<IActionResult> UpisProizvoda(string marka, [FromBody] Spoj sp)
        {
            try
            {
                var raf = await Context.Rafovi.FirstOrDefaultAsync(p => p.Marka == marka);
                sp.Raf = raf;
                sp.NazivMagacina = raf.NazivMagacina;
                sp.BrojProizovda = 0;
                sp.Marka = marka;
                sp.NazivMagacina = raf.NazivMagacina;
                sp.Proizvod = null;     
                if (raf.BrojProizovda == raf.MaxBrProizovda)
                    {
                        return BadRequest("Nema vise mesta!");
                    }        
                Context.RafoviProizvodi.Add(sp);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Doslo je do greske");
            }
            
        }

        [Route("UpisJednogProizvoda/{tip}")]
        [HttpPost]
        public async Task<IActionResult> UpisJednogProizvoda(string tip,[FromBody]Proizvod pr)
        {
            try
            {
                var proizvodi = await Context.RafoviProizvodi.FirstOrDefaultAsync(p => p.Tip == tip && p.NazivMagacina == pr.NazivMagacina);
                pr.Tip = tip;           
                pr.Raf = proizvodi.Raf;
                pr.Marka = proizvodi.Marka;
                pr.ProizvodRaf = proizvodi;
                if (proizvodi.BrojProizovda == proizvodi.MaxBrProizovda)
                    {
                        return BadRequest("Nema vise mesta!");
                    }
                proizvodi.BrojProizovda++;
                var raf = await Context.Rafovi.FirstOrDefaultAsync(p => p.Marka == proizvodi.Marka && p.NazivMagacina == proizvodi.NazivMagacina);
                raf.BrojProizovda++;
                Context.Proizvodi.Add(pr);  
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Doslo je do greske");
            }
        }

        [Route("ObrisiMagacin/{id}")]
        [HttpDelete]
        public async Task<IActionResult> ObrisiMagacin(int id)
        {
            var o = await Context.Magacini.FindAsync(id);
            Context.Magacini.Remove(o);
            await Context.SaveChangesAsync();
            return Ok();
        }

        [Route("IzmeniProizvod/{naziv}/{marka}")]
        [HttpPut]
        public async Task IzmeniProizvod(string naziv, string marka, [FromBody] Proizvod proizvod)
        {   
            try 
            {
                var tajProizvod = await Context.Proizvodi.FirstOrDefaultAsync(p => p.Naziv == naziv && p.Marka == marka);
                tajProizvod.Naziv = proizvod.Naziv;
                tajProizvod.NazivMagacina = proizvod.NazivMagacina;              
                Context.Update<Proizvod>(tajProizvod);
                await Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new Exception("Doslo je do greske");
            }
        }

        [Route("ObrisiTip/{tip}/{nazivM}")]
        [HttpDelete]
        public async Task ObrisiTip(string tip, string nazivM)
        {   
          var t = await Context.RafoviProizvodi.Include(tr => tr.Proizvod).Where(tp => tp.Tip == tip && tp.NazivMagacina == nazivM).ToListAsync();
          var r = Context.Rafovi.FirstOrDefault(m => m.Marka == t[0].Marka && m.NazivMagacina == nazivM);
          foreach(Proizvod p in t[0].Proizvod)
          {
              r.BrojProizovda--;
          }
          Context.RafoviProizvodi.Remove(t[0]);
          await Context.SaveChangesAsync();
        }

        [Route("ObrisiRaf/{marka}/{nazivM}")]
        [HttpDelete]
        public async Task ObrisiRaf(string marka, string nazivM)
        {
          var r = await Context.Rafovi.Include(tr => tr.RafProizvod).Where(tp => tp.Marka == marka && tp.NazivMagacina == nazivM).ToListAsync();
          var m = Context.Magacini.FirstOrDefault(m => m.Naziv == nazivM);
          m.BrRafova--;
          Context.Rafovi.Remove(r[0]);
          await Context.SaveChangesAsync();
        }

        [Route("ObrisiProizvod/{naziv}/{tip}/{nazivM}")]
        [HttpDelete]
        public async Task ObrisiProizvod(string naziv, string tip, string nazivM)
        {
          var p = Context.Proizvodi.FirstOrDefault(pr => pr.Naziv == naziv && pr.NazivMagacina == nazivM && pr.Tip == tip);
          var proiz = Context.RafoviProizvodi.FirstOrDefault(s => s.Tip == tip && s.NazivMagacina == nazivM);
          var r = Context.Rafovi.FirstOrDefault(m => m.NazivMagacina == nazivM && m.Marka == proiz.Marka);
          r.BrojProizovda--;
          proiz.BrojProizovda--;
          Context.Proizvodi.Remove(p);
          await Context.SaveChangesAsync();
        }
    }
}
