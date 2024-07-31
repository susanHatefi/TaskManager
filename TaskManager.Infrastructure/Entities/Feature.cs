namespace TaskManager.Infrastructure.Entities;

public class Feature :ToDoTask
{
    public string Component { get; set; } = default!;
    public int priority { get; set; } = default!;
}
