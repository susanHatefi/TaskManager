using TaskManager.Domain.Enum;

namespace TaskManager.Domain;

public record CreateBug(string Title, string Description, string Severity, string AffectedVersion,User? AssignedTo, IEnumerable<byte[]>? Images, DateTimeOffset DueDate);
