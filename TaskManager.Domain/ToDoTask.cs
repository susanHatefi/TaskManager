namespace TaskManager.Domain;

public record ToDoTask(string Title, DateTimeOffset DueDate,User CreatedBy):ToDo(Guid.NewGuid(),Title,DateTimeOffset.UtcNow, CreatedBy);
