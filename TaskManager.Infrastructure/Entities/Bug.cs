using TaskManager.Domain.Enum;

namespace TaskManager.Infrastructure.Entities;

public class Bug :ToDoTask
{
    public string Description { get; set; } = default!;
    public Severity Severity { get; set; }
    public string AffectedVersion { get; set; } = string.Empty;
    public User? AssignedTo { get; set; } = default!; 
    public virtual IEnumerable<Image> Images { get; set; } = default!;
}
