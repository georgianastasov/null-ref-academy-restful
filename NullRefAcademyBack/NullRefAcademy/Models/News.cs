using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace NullRefAcademy.Models
{
    public class News
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

        [Required(ErrorMessage = "Please enter Text")]
        [StringLength(3000, MinimumLength = 3)]
        public string Text { get; set; }

        [DisplayName("Rating")]
        public int Rating { get; set; }

        [DisplayName("RatingQty")]
        public int RatingQty { get; set; }

        [DisplayName("Created Date")]
        public string? CreatedDate { get; set; }

        [DisplayName("Admin")]
        public int? AdminID { get; set; }
    }
}
