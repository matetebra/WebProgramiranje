using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebProjekat.Models
{   
    [Table("Magacin")]
    public class Magacin
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

        public int Vrsta { get; set; }

        public int Kolona { get; set; }

        public int BrRafova { get; set; }

        public virtual List<Raf> ProizvodiRafovi { get; set; }
    }

}
