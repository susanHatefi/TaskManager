using TaskManager.Domain.Enum;


namespace TaskManager.Infrastructure.Entities;

public class Bug :ToDoTask
{
    public Severity Severity { get; set; }
    public string AffectedVersion { get; set; } = string.Empty;
    public virtual IEnumerable<Image> Images { get; set; } = default!;
}
