using System.Collections.Concurrent;
using System.Linq.Expressions;
using TaskManager.Infrastructure.Contracts;
using TaskManager.Infrastructure.Entities;


namespace TaskManager.Infrastructure.Repositories;

public class InnerMemoryRepository<T> : IRepository<T> where T : ToDo, new()
{
    public static ConcurrentDictionary<Guid, T> CollectionOfData { get; } = new();
    public Task<T> AddAsync(T entity)
    {
        CollectionOfData.TryAdd(entity.Id, entity);
        return Task.FromResult(entity);
    }

    public Task DeleteAsync(T entity)
    {
        var item = CollectionOfData.First(item => item.Key == entity.Id);
        CollectionOfData.TryRemove(item);
        return Task.CompletedTask;
    }

    public Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> expression)
    {
        var items = CollectionOfData.Values.AsQueryable().Select(item => item).AsEnumerable();
        return Task.FromResult(items);
    }

    public Task<IEnumerable<T>> GetAllAsync()
    {
        var items = CollectionOfData.Values.Where(item=>!item.IsDeleted).Select(item=>item).ToArray();
        return Task.FromResult<IEnumerable<T>>(items);
    }

    public Task<T> GetByAsync(Guid Id)
    {
        var item = CollectionOfData[Id];
        return Task.FromResult(item);
    }

    public Task SaveChangesAsync()
    {
        return Task.CompletedTask;
    }

    public async  Task SoftDeleteAsync(Guid Id)
    {
        var item = CollectionOfData[Id];
        item.IsDeleted = true;
        await UpdateAsync(item);
    }

    public Task UpdateAsync(T entity)
    {
        var item = CollectionOfData[entity.Id];
        if (item != null)
        {
            DeleteAsync(item);
        }
        AddAsync(entity);
        return Task.CompletedTask;

    }
}
