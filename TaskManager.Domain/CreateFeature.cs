namespace TaskManager.Domain;

public record CreateFeature(string Title, string Description, string Component, int Priority, DateTimeOffset DueDate, User? AssignedTo);
