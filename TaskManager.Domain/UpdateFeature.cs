namespace TaskManager.Domain;

public record UpdateFeature(Guid Id,string Title, string Description, string Component, int Priority, DateTimeOffset DueDate, User? AssignedTo, bool IsCompeleted,string status);
