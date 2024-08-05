using TaskManager.Domain.Enum;

namespace TaskManager.Domain;

public record BoardTasks(
    )
{
    public Guid? Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public User CreatedBy { get; set; }
    public DateTimeOffset CreatedDate { get; set; }
    public TodoStatus status { get; set; }
    public bool IsCompleted { get; set; }
    public bool IsDeleted { get; set; }
    public User? AssignedTo { get; set; }
    public DateTimeOffset DueDate { get; set; }

    public string? Severity { get; set; } 
    public string? AffectedVersion { get; set; }
    public IEnumerable<byte[]>? Images { get; set; }
public string? Component { get; set; }
public int? priority { get; set; }
public TaskType TaskType { get; set; }
};
