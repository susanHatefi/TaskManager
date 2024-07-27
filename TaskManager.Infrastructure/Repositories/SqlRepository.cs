using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TaskManager.Infrastructure.Contracts;
using TaskManager.Infrastructure.Entities;

namespace TaskManager.Infrastructure.Repositories;

public class SqlRepository<T> : IRepository<T> where T : ToDo, new()
{
    public DbContext _dbContext { get; set; }
    public SqlRepository(DbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task AddAsync(T entity)
    {
        await _dbContext.AddAsync(entity);
        await SaveChangesAsync();
    }

    public async Task DeleteAsync(T entity)
    {

        _dbContext.Remove(entity);
        await SaveChangesAsync();
    }

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> expression)
    {
        var items = await _dbContext.Set<T>().Where(expression).Select(item => item).ToListAsync();
        return items;

    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        var items = await _dbContext.Set<T>().Select(item => item).ToListAsync();
        return items;
    }

    public async Task UpdateAsync(T entity)
    {
        _dbContext.Update(entity);
        await SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}