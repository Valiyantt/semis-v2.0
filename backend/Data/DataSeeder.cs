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
                var adminRole = new AppRole { RoleName = "Admin", Description = "Administrative user" };
                ctx.Roles.AddRange(superRole, adminRole);
                await ctx.SaveChangesAsync();

                // Add a default superadmin user and assign SuperAdmin role
                if (!ctx.Users.Any())
                {
                    var admin = new AppUser
                    {
                        Username = "admin",
                        FullName = "Super Administrator",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"), // change in production
                        RoleId = superRole.RoleId
                    };
                    ctx.Users.Add(admin);
                }
            }
            else
            {
                // Roles exist; ensure at least one admin user exists
                if (!ctx.Users.Any())
                {
                    var super = ctx.Roles.FirstOrDefault(r => r.RoleName == "SuperAdmin") ?? ctx.Roles.FirstOrDefault();
                    var admin = new AppUser
                    {
                        Username = "admin",
                        FullName = "Administrator",
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                        RoleId = super?.RoleId ?? 0
                    };
                    ctx.Users.Add(admin);
                }
            }

            await ctx.SaveChangesAsync();
        }
    }
}
