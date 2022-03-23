using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebProjekat.Models 
{   
    [Table("Proizvod")]
    public class Proizvod 
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(50)]
        public string Naziv { get; set; }

        [JsonIgnore]
        [MaxLength(50)]
        public string Tip { get; set; }

        public string NazivMagacina { get; set; }

        [JsonIgnore]
        public string Marka { get; set; }

        [JsonIgnore]
        public Spoj ProizvodRaf { get; set; }

        [JsonIgnore]
        public Raf Raf { get; set; }
    }
}