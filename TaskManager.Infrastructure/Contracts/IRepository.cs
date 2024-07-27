using System.Linq.Expressions;
using TaskManager.Infrastructure.Entities;

namespace TaskManager.Infrastructure.Contracts;

public interface IRepository<T> where T :ToDo
{
    public Task AddAsync(T entity);
    public Task UpdateAsync(T entity);
    public Task DeleteAsync(T entity);
    public Task<IEnumerable<T>> FindAsync(Expression<Func<T,bool>> expression);
    public Task<IEnumerable<T>> GetAllAsync();
    public Task SaveChangesAsync();
}
