namespace TaskManager.Domain;

public record Feature(string Title, string Description, string Component, int priority, User CreatedBy, User AssignedTo):ToDoTask(Title, DateTimeOffset.MinValue,CreatedBy);
