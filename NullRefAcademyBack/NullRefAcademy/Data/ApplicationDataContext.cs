using NullRefAcademy.Models;
using Microsoft.EntityFrameworkCore;

namespace NullRefAcademy.Data
{
    public class ApplicationDataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<News> News { get; set; }

        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options)
        {

        }
    }
}
