namespace TaskManager.Domain;

public  record ToDo(Guid Id, string Title, DateTimeOffset CreatedDate, User CreatedBy, bool IsCompeted=false, bool IsDeleted=false)
{
    public ToDo? Parent { get; init; }
}
