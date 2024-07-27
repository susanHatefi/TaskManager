namespace TaskManager.Infrastructure.Entities;

public class ToDoTask : ToDo
{
    public DateTimeOffset DueDate { get; init; }
}
