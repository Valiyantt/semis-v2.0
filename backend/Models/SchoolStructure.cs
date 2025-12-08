using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace backend.Models
{
    public class SchoolLevel
    {
        [Key]
        public int SchoolLevelId { get; set; }

        [Required]
        public string LevelName { get; set; } = ""; // Primary School, Middle School, etc.

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Grade
    {
        [Key]
        public int GradeId { get; set; }

        [Required]
        public string GradeName { get; set; } = ""; // K1, GRADE 1, BSCS, etc.

        [Required]
        public int SchoolLevelId { get; set; }

        public SchoolLevel SchoolLevel { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
