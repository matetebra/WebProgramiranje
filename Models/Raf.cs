using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebProjekat.Models 
{
    [Table("Raf")]
    public class Raf 
    {
        [Key]
        public int ID { get; set; }

        public int BrojProizovda { get; set; }

        public int MaxBrProizovda { get; set; }

        public string NazivMagacina { get; set; }

        [JsonIgnore]
        public Magacin Magacin { get; set; }

        public string Marka { get; set; }

        public virtual List<Spoj> RafProizvod { get; set; }

    }
}
