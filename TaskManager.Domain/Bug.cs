using TaskManager.Domain.Enum;

namespace TaskManager.Domain;

public record Bug(string Title, string Description, Severity Severity, string AffectedVersion,User CreatedBy, User? AssignedTo, IEnumerable<byte[]> Images ):ToDoTask(Title,DateTimeOffset.MinValue,CreatedBy );
