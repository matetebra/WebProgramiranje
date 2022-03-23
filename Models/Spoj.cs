using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebProjekat.Models 
{
    [Table("Spoj")]
    public class Spoj 
    {
        [Key]
        public int ID { get; set; }

        [JsonIgnore]
        public string Marka { get; set; }

        [JsonIgnore]
        public string NazivMagacina { get; set; }

        public string Tip { get; set; }

        public int BrojProizovda { get; set; }

        public int MaxBrProizovda { get; set;} 

        public List<Proizvod> Proizvod { get; set; }

        [JsonIgnore]
        public Raf Raf { get; set; }
    }
}