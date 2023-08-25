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

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(500, MinimumLength = 3)]
        public string Description { get; set; }

        [Required(ErrorMessage = "Points is required.")]
        public int Points { get; set; }

        [DisplayName("Rating")]
        public int? Rating { get; set; }

        [DisplayName("Rating Quantity")]
        public int? RatingQty { get; set; }

        [DisplayName("Video Url")]
        public string? VideoUrl { get; set; }

        [DisplayName("Created Date")]
        public string? CreatedDate { get; set; }

        [DisplayName("Category")]
        public int CategoryID { get; set; }

        [DisplayName("Teacher")]
        public int? TeacherID { get; set; }

        [DisplayName("Admin")]
        public int? AdminID { get; set; }

        [StringLength(3000)]
        [DisplayName("Students")]
        public string? StudentsIDs { get; set; }
    }
}
