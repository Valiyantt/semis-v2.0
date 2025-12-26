using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Controllers
{
    [ApiController]
    [Route("backend/[controller]")]
    public class LibrarianController : ControllerBase
    {
        private readonly AppDbContext _ctx;

        public LibrarianController(AppDbContext ctx) => _ctx = ctx;

        // Book Management
        [HttpGet("books")]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _ctx.Books.ToListAsync();
            return Ok(books);
        }

        [HttpGet("books/{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _ctx.Books.FindAsync(id);
            if (book == null) return NotFound(new { message = "Book not found" });
            return Ok(book);
        }

        [HttpPost("books")]
        public async Task<IActionResult> CreateBook([FromBody] CreateBookDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var book = new Book
            {
                Title = dto.Title,
                Author = dto.Author,
                ISBN = dto.ISBN,
                Publisher = dto.Publisher,
                PublishedYear = dto.PublishedYear,
                Category = dto.Category,
                Quantity = dto.Quantity,
                AvailableQuantity = dto.Quantity,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow
            };

            _ctx.Books.Add(book);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookById), new { id = book.BookId }, book);
        }

        [HttpPut("books/{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] UpdateBookDto dto)
        {
            var book = await _ctx.Books.FindAsync(id);
            if (book == null) return NotFound(new { message = "Book not found" });

            book.Title = dto.Title ?? book.Title;
            book.Author = dto.Author ?? book.Author;
            book.Category = dto.Category ?? book.Category;
            book.Quantity = dto.Quantity ?? book.Quantity;
            book.Description = dto.Description ?? book.Description;
            book.UpdatedAt = DateTime.UtcNow;

            _ctx.Books.Update(book);
            await _ctx.SaveChangesAsync();

            return Ok(book);
        }

        [HttpDelete("books/{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _ctx.Books.FindAsync(id);
            if (book == null) return NotFound(new { message = "Book not found" });

            _ctx.Books.Remove(book);
            await _ctx.SaveChangesAsync();

            return Ok(new { message = "Book deleted successfully" });
        }

        // Borrowing Management
        [HttpGet("borrowed")]
        public async Task<IActionResult> GetBorrowedBooks()
        {
            var borrowed = await _ctx.BorrowRecords
                .Include(b => b.Student)
                .Include(b => b.Book)
                .Where(b => b.ReturnDate == null)
                .ToListAsync();

            return Ok(borrowed);
        }

        [HttpPost("borrow")]
        public async Task<IActionResult> BorrowBook([FromBody] BorrowBookDto dto)
        {
            var book = await _ctx.Books.FindAsync(dto.BookId);
            if (book == null) return NotFound(new { message = "Book not found" });

            if (book.AvailableQuantity <= 0)
                return BadRequest(new { message = "Book not available" });

            var student = await _ctx.Users.FindAsync(dto.StudentId);
            if (student == null) return NotFound(new { message = "Student not found" });

            var borrow = new BorrowRecord
            {
                BookId = dto.BookId,
                StudentId = dto.StudentId,
                BorrowDate = DateTime.UtcNow,
                DueDate = DateTime.UtcNow.AddDays(14),
                Status = "active"
            };

            book.AvailableQuantity--;
            _ctx.BorrowRecords.Add(borrow);
            _ctx.Books.Update(book);
            await _ctx.SaveChangesAsync();

            return Ok(new { message = "Book borrowed successfully", borrowRecord = borrow });
        }

        [HttpPost("return/{borrowId}")]
        public async Task<IActionResult> ReturnBook(int borrowId)
        {
            var borrow = await _ctx.BorrowRecords.Include(b => b.Book).FirstOrDefaultAsync(b => b.BorrowId == borrowId);
            if (borrow == null) return NotFound(new { message = "Borrow record not found" });

            borrow.ReturnDate = DateTime.UtcNow;
            borrow.Status = "returned";

            // Calculate fine if overdue
            if (DateTime.UtcNow > borrow.DueDate)
            {
                var daysOverdue = (DateTime.UtcNow - borrow.DueDate).Days;
                borrow.Fine = daysOverdue * 50; // 50 currency units per day
            }

            borrow.Book.AvailableQuantity++;
            _ctx.BorrowRecords.Update(borrow);
            _ctx.Books.Update(borrow.Book);
            await _ctx.SaveChangesAsync();

            return Ok(new { message = "Book returned successfully", borrowRecord = borrow });
        }

        // Library Inventory
        [HttpGet("inventory")]
        public async Task<IActionResult> GetInventory()
        {
            var inventory = await _ctx.Books
                .Select(b => new
                {
                    b.BookId,
                    b.Title,
                    b.Author,
                    b.Category,
                    TotalQuantity = b.Quantity,
                    AvailableQuantity = b.AvailableQuantity,
                    BorrowedQuantity = b.Quantity - b.AvailableQuantity
                })
                .ToListAsync();

            return Ok(inventory);
        }

        // Library Statistics
        [HttpGet("statistics")]
        public async Task<IActionResult> GetStatistics()
        {
            var totalBooks = await _ctx.Books.CountAsync();
            var totalBorrowed = await _ctx.BorrowRecords.CountAsync(b => b.ReturnDate == null);
            var totalCategories = await _ctx.Books.Select(b => b.Category).Distinct().CountAsync();
            var activeFines = await _ctx.BorrowRecords
                .Where(b => b.Fine > 0 && b.ReturnDate == null)
                .SumAsync(b => b.Fine ?? 0);

            return Ok(new
            {
                totalBooks,
                totalBorrowed,
                totalCategories,
                activeFines,
                availableBooks = await _ctx.Books.SumAsync(b => b.AvailableQuantity)
            });
        }
    }

    // DTOs
    public class CreateBookDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public string ISBN { get; set; }

        public string Publisher { get; set; }
        public int PublishedYear { get; set; }

        [Required]
        public string Category { get; set; }

        public int Quantity { get; set; }
        public string Description { get; set; }
    }

    public class UpdateBookDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public int? Quantity { get; set; }
        public string Description { get; set; }
    }

    public class BorrowBookDto
    {
        [Required]
        public int BookId { get; set; }

        [Required]
        public int StudentId { get; set; }
    }
}
