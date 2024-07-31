using TaskManager.Domain.Enum;

namespace TaskManager.Domain;

public record Bug(Severity Severity, string AffectedVersion,  IEnumerable<byte[]>? Images):ToDoTask( );
