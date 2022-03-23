using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Spoj_Magacin_MagacinID",
                table: "Spoj");

            migrationBuilder.DropIndex(
                name: "IX_Spoj_MagacinID",
                table: "Spoj");

            migrationBuilder.DropColumn(
                name: "MagacinID",
                table: "Spoj");

            migrationBuilder.RenameColumn(
                name: "Tip",
                table: "Raf",
                newName: "NazivMagacina");

            migrationBuilder.AddColumn<int>(
                name: "BrojProizovda",
                table: "Spoj",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MaxBrProizovda",
                table: "Spoj",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Tip",
                table: "Spoj",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Marka",
                table: "Raf",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Marka",
                table: "Proizvod",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NazivMagacina",
                table: "Proizvod",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RafID",
                table: "Proizvod",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Proizvod_RafID",
                table: "Proizvod",
                column: "RafID");

            migrationBuilder.AddForeignKey(
                name: "FK_Proizvod_Raf_RafID",
                table: "Proizvod",
                column: "RafID",
                principalTable: "Raf",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Proizvod_Raf_RafID",
                table: "Proizvod");

            migrationBuilder.DropIndex(
                name: "IX_Proizvod_RafID",
                table: "Proizvod");

            migrationBuilder.DropColumn(
                name: "BrojProizovda",
                table: "Spoj");

            migrationBuilder.DropColumn(
                name: "MaxBrProizovda",
                table: "Spoj");

            migrationBuilder.DropColumn(
                name: "Tip",
                table: "Spoj");

            migrationBuilder.DropColumn(
                name: "Marka",
                table: "Raf");

            migrationBuilder.DropColumn(
                name: "Marka",
                table: "Proizvod");

            migrationBuilder.DropColumn(
                name: "NazivMagacina",
                table: "Proizvod");

            migrationBuilder.DropColumn(
                name: "RafID",
                table: "Proizvod");

            migrationBuilder.RenameColumn(
                name: "NazivMagacina",
                table: "Raf",
                newName: "Tip");

            migrationBuilder.AddColumn<int>(
                name: "MagacinID",
                table: "Spoj",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Spoj_MagacinID",
                table: "Spoj",
                column: "MagacinID");

            migrationBuilder.AddForeignKey(
                name: "FK_Spoj_Magacin_MagacinID",
                table: "Spoj",
                column: "MagacinID",
                principalTable: "Magacin",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
