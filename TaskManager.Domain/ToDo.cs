using TaskManager.Domain.Enum;

namespace TaskManager.Domain;

public  record ToDo(Guid? Id, TodoStatus status=TodoStatus.Todo, bool IsCompeted=false, bool IsDeleted=false):IToDo
{
    public Guid? Id { get; set; } = Id ?? Guid.NewGuid();
    public string Title { get; set; }
    public string Description { get; set; }
    public User CreatedBy { get; set; }= new User("Sara Hatefi") {
    FullName="Sara Hatefi",
    Id=Guid.NewGuid()};
    public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;
    public ToDo? Parent { get; init; }
}

public interface IToDo
{
   
}
