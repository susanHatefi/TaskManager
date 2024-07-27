using TaskManager.Domain;

namespace TaskManager.Infrastructure.Entities;

public abstract class ToDo
{
    public Guid Id { get; set; }=Guid.NewGuid();
    public string Title { get; set; } = default!;
    public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;
    public User CreatedBy { get; set; } = default!;
    public bool IsCompeted{ get; set; } = default!;
    public bool IsDeleted { get; set; } = default!;
    public virtual ToDo? Parent { get; set; } = default!;
}
