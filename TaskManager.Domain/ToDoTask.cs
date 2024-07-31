namespace TaskManager.Domain;

public record ToDoTask() : ToDo(Guid.NewGuid())
{
    public User? AssignedTo { get; set; }
    public DateTimeOffset DueDate { get; set; }

};
