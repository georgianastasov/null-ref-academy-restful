using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NullRefAcademy.Migrations
{
    public partial class UsersRate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UsersRateIDs",
                table: "News",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsersRateIDs",
                table: "Courses",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsersRateIDs",
                table: "Articles",
                type: "nvarchar(3000)",
                maxLength: 3000,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsersRateIDs",
                table: "News");

            migrationBuilder.DropColumn(
                name: "UsersRateIDs",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "UsersRateIDs",
                table: "Articles");
        }
    }
}
