using TaskManager.Domain.Enum;

namespace TaskManager.Infrastructure.Entities;

public  class ToDo :IToDo
{
    public Guid Id { get; set; }=Guid.NewGuid();
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;
    public User CreatedBy { get; set; } = default!;
    public TodoStatus Status { get; set; } = TodoStatus.Todo;
    public bool IsCompeted{ get; set; } = default!;
    public bool IsDeleted { get; set; } = default!;
    public virtual ToDo? Parent { get; set; } = default!;
}

public interface IToDo { }