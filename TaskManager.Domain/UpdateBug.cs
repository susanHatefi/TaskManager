namespace TaskManager.Domain;

public record UpdateBug(Guid Id,string Title, string Description, string Severity, string AffectedVersion, User? AssignedTo, IEnumerable<byte[]>? Images, DateTimeOffset DueDate, bool IsCompeleted, string status);