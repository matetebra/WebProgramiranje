using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Magacin",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Vrsta = table.Column<int>(type: "int", nullable: false),
                    Kolona = table.Column<int>(type: "int", nullable: false),
                    BrMagacina = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Magacin", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Raf",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrojProizovda = table.Column<int>(type: "int", nullable: false),
                    MaxBrProizovda = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Raf", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Spoj",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Marka = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NazivMagacina = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RafID = table.Column<int>(type: "int", nullable: true),
                    MagacinID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spoj", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Spoj_Magacin_MagacinID",
                        column: x => x.MagacinID,
                        principalTable: "Magacin",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Spoj_Raf_RafID",
                        column: x => x.RafID,
                        principalTable: "Raf",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Proizvod",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Tip = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ProizvodRafID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proizvod", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Proizvod_Spoj_ProizvodRafID",
                        column: x => x.ProizvodRafID,
                        principalTable: "Spoj",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Proizvod_ProizvodRafID",
                table: "Proizvod",
                column: "ProizvodRafID");

            migrationBuilder.CreateIndex(
                name: "IX_Spoj_MagacinID",
                table: "Spoj",
                column: "MagacinID");

            migrationBuilder.CreateIndex(
                name: "IX_Spoj_RafID",
                table: "Spoj",
                column: "RafID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Proizvod");

            migrationBuilder.DropTable(
                name: "Spoj");

            migrationBuilder.DropTable(
                name: "Magacin");

            migrationBuilder.DropTable(
                name: "Raf");
        }
    }
}
