﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace NullRefAcademy.Models
{
    public class News
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

        [DisplayName("Rating")]
        public int? Rating { get; set; }

        [DisplayName("Rating Quantity")]
        public int? RatingQty { get; set; }

        [DisplayName("Created Date")]
        public string? CreatedDate { get; set; }

        [DisplayName("Admin")]
        public int? AdminID { get; set; }
    }
}
