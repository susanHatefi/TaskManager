namespace TaskManager.Domain;

public record User(string FullName)
{
    public Guid Id { get; set; }=Guid.NewGuid();   
};
