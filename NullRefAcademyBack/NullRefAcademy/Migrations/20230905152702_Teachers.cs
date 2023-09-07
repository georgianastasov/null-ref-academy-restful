using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NullRefAcademy.Migrations
{
    public partial class Teachers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TeacherIDs",
                table: "News",
                newName: "TeachersIDs");

            migrationBuilder.RenameColumn(
                name: "TeacherIDs",
                table: "Articles",
                newName: "TeachersIDs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TeachersIDs",
                table: "News",
                newName: "TeacherIDs");

            migrationBuilder.RenameColumn(
                name: "TeachersIDs",
                table: "Articles",
                newName: "TeacherIDs");
        }
    }
}
