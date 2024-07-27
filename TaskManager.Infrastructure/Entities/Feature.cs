namespace TaskManager.Infrastructure.Entities;

public class Feature :ToDoTask
{
    public string Description { get; set; } = default!;
    public string Component { get; set; } = default!;
    public int priority { get; set; } = default!;
    public User AssignedTo { get; set; } = default!;
}
