namespace TaskManager.Domain;

public record CreateToDoTask(string Title,string Description, DateTimeOffset DueDate);
