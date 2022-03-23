using Microsoft.EntityFrameworkCore;

namespace WebProjekat.Models 
{
    public class ProdavnicaContext : DbContext
    {
        public DbSet<Magacin> Magacini { get; set; }
        public DbSet<Proizvod> Proizvodi { get; set; }
        public DbSet<Raf> Rafovi { get; set; }
        public DbSet<Spoj> RafoviProizvodi { get; set; }

        public ProdavnicaContext(DbContextOptions options) : base(options)
        {

        }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
            // base.OnModelCreating(modelBuilder);

            // modelBuilder.Entity<Proizvod>()
            //             .HasOne(p => p.ProizvodRaf)
            //             .WithMany(p => p.Proizvod);
            //             .HasForeignKey<Spoj>(p => p.Proizvod.ID);
        // }
    }
}