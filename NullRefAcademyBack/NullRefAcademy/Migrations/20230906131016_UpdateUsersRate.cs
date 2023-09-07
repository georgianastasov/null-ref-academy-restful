using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NullRefAcademy.Migrations
{
    public partial class UpdateUsersRate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UsersRateIDs",
                table: "News",
                newName: "UsersTeachersRateIDs");

            migrationBuilder.RenameColumn(
                name: "UsersRateIDs",
                table: "Courses",
                newName: "UsersTeachersRateIDs");

            migrationBuilder.RenameColumn(
                name: "UsersRateIDs",
                table: "Articles",
                newName: "UsersTeachersRateIDs");

            migrationBuilder.AddColumn<string>(
                name: "UsersStudentsRateIDs",
                table: "News",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsersStudentsRateIDs",
                table: "Courses",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsersStudentsRateIDs",
                table: "Articles",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsersStudentsRateIDs",
                table: "News");

            migrationBuilder.DropColumn(
                name: "UsersStudentsRateIDs",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "UsersStudentsRateIDs",
                table: "Articles");

            migrationBuilder.RenameColumn(
                name: "UsersTeachersRateIDs",
                table: "News",
                newName: "UsersRateIDs");

            migrationBuilder.RenameColumn(
                name: "UsersTeachersRateIDs",
                table: "Courses",
                newName: "UsersRateIDs");

            migrationBuilder.RenameColumn(
                name: "UsersTeachersRateIDs",
                table: "Articles",
                newName: "UsersRateIDs");
        }
    }
}
