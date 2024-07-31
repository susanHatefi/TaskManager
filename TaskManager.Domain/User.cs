namespace TaskManager.Domain;

public record User(string FullName):IToDo
{
    public Guid Id { get; set; }=Guid.NewGuid();   
};
