﻿using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TaskManager.Infrastructure.Contracts;
using TaskManager.Infrastructure.Entities;

namespace TaskManager.Infrastructure.Repositories;

public class SqlRepository<T> : IRepository<T> where T : ToDo, new()
{
    public DBContext _dbContext { get; set; }
    public SqlRepository(DBContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<T> AddAsync(T entity)
    {
        await _dbContext.AddAsync(entity);
        await SaveChangesAsync();
        return entity;
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

    public Task<T> GetByAsync(Guid Id)
    {
        var item=_dbContext.Set<T>().First(item => item.Id == Id);
        return Task.FromResult(item);
    }

    public async Task SoftDeleteAsync(Guid Id)
    {
        var item=await GetByAsync(Id);
        item.IsDeleted = true;
        await UpdateAsync(item);
        await SaveChangesAsync();

    }
}