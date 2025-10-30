using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly AppDbContext _ctx;
        protected readonly DbSet<T> _db;
        public Repository(AppDbContext ctx)
        {
            _ctx = ctx;
            _db = ctx.Set<T>();
        }

        public IQueryable<T> Query() => _db.AsQueryable();

        public async Task<T?> GetAsync(int id)
        {
            return await _db.FindAsync(id);
        }

        public async Task AddAsync(T entity)
        {
            await _db.AddAsync(entity);
        }

        public Task UpdateAsync(T entity)
        {
            _db.Update(entity);
            return Task.CompletedTask;
        }

        public Task RemoveAsync(T entity)
        {
            _db.Remove(entity);
            return Task.CompletedTask;
        }

        public async Task SaveChangesAsync()
        {
            await _ctx.SaveChangesAsync();
        }
    }
}