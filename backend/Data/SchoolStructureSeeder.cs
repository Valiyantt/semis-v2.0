using backend.Data;
using backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Seeders
{
    public class SchoolStructureSeeder
    {
        public static async Task SeedSchoolStructure(AppDbContext context)
        {
            // Check if data already exists
            if (context.SchoolLevels.Any())
                return;

            var schoolStructure = new List<(string LevelName, List<string> Grades)>
            {
                ("Primary School", new List<string> { "K1", "K2", "K3", "GRADE 1", "GRADE 2", "GRADE 3", "Pre-K", "Preparatory", "Kinder" }),
                ("Middle School", new List<string> { "GRADE 4", "GRADE 5", "GRADE 6" }),
                ("Junior High", new List<string> { "GRADE 7", "GRADE 8", "GRADE 9", "GRADE 10" }),
                ("Senior High", new List<string> { "GRADE 11", "GRADE 12" }),
                ("TESDA", new List<string> { "1st Year", "2nd Year" }),
                ("College", new List<string>
                {
                    "BSCS", "BSHM", "BSBA MANAC", "BSBA MMAN", "BSBA HRM", "BSN", "AB ENG", "AB FIL", "BEED", 
                    "BSED ENG", "BSED FIL", "BSED MATH", "BSBA", "CPE", "ACT", "BECED", "BSP", "BSTM", "BHS", 
                    "BSED SS", "ABA", "AHM", "ACS"
                })
            };

            foreach (var (levelName, grades) in schoolStructure)
            {
                var schoolLevel = new SchoolLevel { LevelName = levelName };
                context.SchoolLevels.Add(schoolLevel);
                await context.SaveChangesAsync();

                foreach (var gradeName in grades)
                {
                    var grade = new Grade
                    {
                        GradeName = gradeName,
                        SchoolLevelId = schoolLevel.SchoolLevelId
                    };
                    context.Grades.Add(grade);
                }

                await context.SaveChangesAsync();
            }
        }
    }
}
