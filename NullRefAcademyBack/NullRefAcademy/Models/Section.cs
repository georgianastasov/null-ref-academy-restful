using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NullRefAcademy.Models
{
    public class Section
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

        [Required(ErrorMessage = "Text is required.")]
        [StringLength(3000, MinimumLength = 3)]
        public string Text { get; set; }

        [DisplayName("Video Url")]
        public string? VideoUrl { get; set; }

        [DisplayName("Course")]
        public int CourseID { get; set; }

        [DisplayName("Admin")]
        public int? AdminID { get; set; }

        [DisplayName("Teacher")]
        public int? TeacherID { get; set; }
    }
}
