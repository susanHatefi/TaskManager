using TaskManager.Infrastructure.Entities;

namespace TaskManager.Infrastructure.Mapping;

public static class DataToDomain
{
    public static D AsDomain<T, D>(this T entity) where T : IToDo 
    {
        if (entity == null) throw new ArgumentNullException();
        var domianData = entity switch
        {
            Bug bug => ToDomainBug(bug),
            Feature feature => ToDomainFeature(feature),
            ToDoTask task => ToDomainTask(task),
            _ => throw new NotImplementedException()
        };
        return (D)domianData;

    }

    private static Domain.IToDo ToDomainBug(Bug bug)
    {
        var domainBug = new Domain.Bug(
            bug.Severity,
            bug.AffectedVersion,
            bug?.Images?.Select(img=>Convert.FromBase64String(img.ImageData)).ToArray()?? Enumerable.Empty<byte[]>())
        {
            Id=bug.Id,
            DueDate=bug.DueDate,
            Title=bug.Title,
            Description=bug.Description,
            status=bug.Status,
            AssignedTo= (Domain.User)ToDomainUser(bug?.AssignedTo),
        };
        return domainBug;
    }

    private static Domain.IToDo ToDomainFeature(Feature feature)
    {
        var domainFeature=new Domain.Feature(feature.Component, feature.priority)
        {
            Id=feature.Id,
            IsCompeted=feature.IsCompeted,
            DueDate=feature.DueDate,
            Title = feature.Title,
            Description = feature.Description,
            status= feature.Status,
            AssignedTo = (Domain.User)ToDomainUser(feature?.AssignedTo),
        };
        return domainFeature;
    }

    private static Domain.User ToDomainUser(User? user)
    {
        if (user == null) return null!;
        var domainUser = new Domain.User(user.FullName)
        {
            Id = user.Id,
        };
        return domainUser;
    }

    private static Domain.IToDo ToDomainTask(ToDoTask task)
    {
        var domainTask = new Domain.ToDoTask()
        {
            Id=task.Id,
            IsCompeted = task.IsCompeted,
            DueDate = task.DueDate,
            Title = task.Title,
            Description = task.Description,
            AssignedTo = (Domain.User)ToDomainUser(task?.AssignedTo),
            CreatedBy= (Domain.User)ToDomainUser(task.CreatedBy),
            CreatedDate = task.CreatedDate,
            IsDeleted=task.IsDeleted,
            status=task.Status,
        };
       return domainTask;

    }
}
