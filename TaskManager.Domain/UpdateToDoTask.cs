namespace TaskManager.Domain;

public record UpdateToDoTask(Guid Id,string Title,string Description, DateTimeOffset DueDate,bool IsCompeleted, string status);
