using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MagacinID",
                table: "Raf",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Raf_MagacinID",
                table: "Raf",
                column: "MagacinID");

            migrationBuilder.AddForeignKey(
                name: "FK_Raf_Magacin_MagacinID",
                table: "Raf",
                column: "MagacinID",
                principalTable: "Magacin",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Raf_Magacin_MagacinID",
                table: "Raf");

            migrationBuilder.DropIndex(
                name: "IX_Raf_MagacinID",
                table: "Raf");

            migrationBuilder.DropColumn(
                name: "MagacinID",
                table: "Raf");
        }
    }
}
