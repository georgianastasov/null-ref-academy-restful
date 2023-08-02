using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NullRefAcademy.Models
{
    public class Course
    {
        [Key, Column(Order = 1)]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter Title")]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; }

        [Required(ErrorMessage = "Please enter Description")]
        [StringLength(500, MinimumLength = 3)]
        public string Description { get; set; }

        [Required(ErrorMessage = "Please enter Points for the Course")]
        public int Points { get; set; }

        [DisplayName("Rating")]
        public int Rating { get; set; }

        [DisplayName("RatingQty")]
        public int RatingQty { get; set; }

        [DisplayName("VideoUrl")]
        public string VideoUrl { get; set; }

        [DisplayName("Created Date")]
        public string? CreatedDate { get; set; }

        [DisplayName("Category")]
        public int CategoryID { get; set; }

        [DisplayName("Teacher")]
        public int? TeacherID { get; set; }

        [DisplayName("Admin")]
        public int? AdminID { get; set; }

        [StringLength(2000)]
        [DisplayName("Students")]
        public string? StudentsIDs { get; set; }
    }
}
