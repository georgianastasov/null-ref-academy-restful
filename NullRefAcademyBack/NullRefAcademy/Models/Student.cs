using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NullRefAcademy.Models
{
    public class Student
    {
        [Key, Column(Order = 1)]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "First Name is required.")]
        [StringLength(50, MinimumLength = 3)]
        [DisplayName("First Name")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required.")]
        [StringLength(50, MinimumLength = 3)]
        [DisplayName("Last Name")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Username is required.")]
        [StringLength(50, MinimumLength = 6)]
        public string Username { get; set; }

        [Required(ErrorMessage = "E-mail is required.")]
        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}")]
        public string Email { get; set; }

        [DisplayName("Account Type")]
        public string? AccountType { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required.")]
        [Compare("Password")]
        [DisplayName("Confirm Password")]
        public string ConfirmPassword { get; set; }

        [DisplayName("Created Date")]
        public string? CreatedDate { get; set; }

        [StringLength(300, MinimumLength = 6)]
        public string? Bio { get; set; }

        public int? Points { get; set; }

        public int? Progress { get; set; }

        [DisplayName("Time Spent")]
        public string? TimeSpent { get; set; }

        [StringLength(2000)]
        [DisplayName("Courses")]
        public string? CoursesIDs { get; set; }

        [StringLength(3000)]
        [DisplayName("Articles")]
        public string? ArticleIDs { get; set; }

        [StringLength(3000)]
        [DisplayName("News")]
        public string? NewsIDs { get; set; }
    }
}
