using System.Linq.Expressions;
using TaskManager.Infrastructure.Entities;

namespace TaskManager.Infrastructure.Contracts;

public interface IRepository<T> where T :ToDo, new()
{
    public Task<T> AddAsync(T entity);
    public Task UpdateAsync(T entity);
    public Task DeleteAsync(T entity);
    public Task SoftDeleteAsync(Guid Id);
    public Task<IEnumerable<T>> FindAsync(Expression<Func<T,bool>> expression);
    public Task<IEnumerable<T>> GetAllAsync();
    public Task<T> GetByAsync(Guid Id);
    public Task SaveChangesAsync();
}
