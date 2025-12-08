using backend.Models;


namespace backend.Data
{
    public static class DataSeeder
    {
        // Seeds DB reading .txt files from ContentFiles directory (next to project root)
        public static async Task SeedAsync(AppDbContext ctx)
        {
            var contentFolder = Path.Combine(Directory.GetCurrentDirectory(), "ContentFiles");
            if (!Directory.Exists(contentFolder))
            {
                Directory.CreateDirectory(contentFolder);
                // nothing to seed if no files
            }

            var files = Directory.GetFiles(contentFolder, "*.txt");

            // Welcome
            if (!ctx.WelcomePages.Any())
            {
                var welcomeFile = files.FirstOrDefault(f => Path.GetFileName(f).ToLower().Contains("welcome"));
                if (welcomeFile != null)
                {
                    var txt = await File.ReadAllTextAsync(welcomeFile);
                    ctx.WelcomePages.Add(new WelcomePage { Content = txt, UpdatedAt = DateTime.UtcNow });
                }
            }

            // About
            if (!ctx.AboutUsEntries.Any())
            {
                var aboutFile = files.FirstOrDefault(f => Path.GetFileName(f).ToLower().Contains("letter") || Path.GetFileName(f).ToLower().Contains("about"));
                if (aboutFile != null)
                {
                    var txt = await File.ReadAllTextAsync(aboutFile);
                    ctx.AboutUsEntries.Add(new AboutUs { Content = txt });
                }
            }

            // Programs
            if (!ctx.Programs.Any())
            {
                var progFiles = files.Where(f => Path.GetFileName(f).StartsWith("Prgrms_", StringComparison.OrdinalIgnoreCase) ||
                                                 Path.GetFileName(f).StartsWith("Programs_", StringComparison.OrdinalIgnoreCase));
                foreach (var f in progFiles)
                {
                    var content = await File.ReadAllTextAsync(f);
                    var name = Path.GetFileNameWithoutExtension(f).Replace("Prgrms_", "").Replace("Programs_", "").Replace('_', ' ');
                    ctx.Programs.Add(new ProgramEntry
                    {
                        Title = name.Trim(),
                        Department = name.Trim(),
                        Description = content
                    });
                }

                // fallback: if no Prgrms files, try to parse a Programs list file
                var fallback = files.FirstOrDefault(f => Path.GetFileName(f).ToLower().Contains("programs"));
                if (fallback != null && !ctx.Programs.Any())
                {
                    var content = await File.ReadAllTextAsync(fallback);
                    // split by double newlines or lines
                    var chunks = content.Split(new[] { "\r\n\r\n", "\n\n" }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (var ch in chunks.Take(20))
                    {
                        var t = ch.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries).FirstOrDefault() ?? "Program";
                        ctx.Programs.Add(new ProgramEntry { Title = t.Trim(), Department = t.Trim(), Description = ch.Trim() });
                    }
                }
            }

            // Billing
            if (!ctx.BillingStatements.Any())
            {
                var billFile = files.FirstOrDefault(f => Path.GetFileName(f).ToLower().Contains("payment") || Path.GetFileName(f).ToLower().Contains("bill"));
                if (billFile != null)
                {
                    var content = await File.ReadAllTextAsync(billFile);
                    var lines = content.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (var l in lines.Take(30))
                    {
                        ctx.BillingStatements.Add(new BillingStatement
                        {
                            AccountName = "Sample",
                            Amount = 0,
                            Details = l,
                            DueDate = DateTime.UtcNow.AddDays(30)
                        });
                    }
                }
            }

            // Seed default roles and a superadmin user if none exist
            if (!ctx.Roles.Any())
            {
                var superRole = new AppRole { RoleName = "SuperAdmin", Description = "Full system owner" };
                var facultyRole = new AppRole { RoleName = "Faculty", Description = "Faculty member" };
                var studentRole = new AppRole { RoleName = "Student", Description = "Student user" };
                var adminRole = new AppRole { RoleName = "Admin", Description = "Administrative user" };
                ctx.Roles.AddRange(superRole, facultyRole, studentRole, adminRole);
                await ctx.SaveChangesAsync();

                // Add three dummy users if none exist
                if (!ctx.Users.Any())
                {
                    // SuperAdmin Account
                    var superAdmin = new AppUser
                    {
                        Username = "admin",
                        FullName = "Super Administrator",
                        Email = "admin@semis.edu",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                        RoleId = superRole.RoleId,
                        IsActive = true
                    };

                    // Faculty Account
                    var faculty = new AppUser
                    {
                        Username = "faculty01",
                        FullName = "Dr. James Anderson",
                        Email = "james.anderson@semis.edu",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("faculty123"),
                        RoleId = facultyRole.RoleId,
                        IsActive = true
                    };

                    // Student Account
                    var student = new AppUser
                    {
                        Username = "student01",
                        FullName = "John Smith",
                        Email = "john.smith@student.semis.edu",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("student123"),
                        RoleId = studentRole.RoleId,
                        IsActive = true
                    };

                    ctx.Users.AddRange(superAdmin, faculty, student);
                }
            }
            else
            {
                // Roles exist; ensure dummy accounts exist
                if (!ctx.Users.Any())
                {
                    var superRole = ctx.Roles.FirstOrDefault(r => r.RoleName == "SuperAdmin");
                    var facultyRole = ctx.Roles.FirstOrDefault(r => r.RoleName == "Faculty");
                    var studentRole = ctx.Roles.FirstOrDefault(r => r.RoleName == "Student");

                    if (superRole != null)
                    {
                        var superAdmin = new AppUser
                        {
                            Username = "admin",
                            FullName = "Super Administrator",
                            Email = "admin@semis.edu",
                            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                            RoleId = superRole.RoleId,
                            IsActive = true
                        };
                        ctx.Users.Add(superAdmin);
                    }

                    if (facultyRole != null)
                    {
                        var faculty = new AppUser
                        {
                            Username = "faculty01",
                            FullName = "Dr. James Anderson",
                            Email = "james.anderson@semis.edu",
                            PasswordHash = BCrypt.Net.BCrypt.HashPassword("faculty123"),
                            RoleId = facultyRole.RoleId,
                            IsActive = true
                        };
                        ctx.Users.Add(faculty);
                    }

                    if (studentRole != null)
                    {
                        var student = new AppUser
                        {
                            Username = "student01",
                            FullName = "John Smith",
                            Email = "john.smith@student.semis.edu",
                            PasswordHash = BCrypt.Net.BCrypt.HashPassword("student123"),
                            RoleId = studentRole.RoleId,
                            IsActive = true
                        };
                        ctx.Users.Add(student);
                    }
                }
            }

            await ctx.SaveChangesAsync();
        }
    }
}
