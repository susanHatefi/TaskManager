using TaskManager.Infrastructure.Entities;

namespace TaskManager.Infrastructure.Mapping;

public static class DataToDomain
{
    public static D AsDomain<T, D>(this T entity) where T : ToDo, new() where D : Domain.ToDo, new()
    {
        if (entity == null) return null!;
        var domianData = entity switch
        {
            Bug bug => ToDomainBug(bug) as D,
            Feature feature => ToDomainFeature(feature) as D,
            ToDoTask task => ToDomainTask(task) as D,
            User user => ToDomainUser(user) as D,
            _=> null
        };
        return domianData;

    }

    private static Domain.Bug ToDomainBug(Bug bug)
    {
        var domainBug = new Domain.Bug(bug.Title,
            bug.Description,
            bug.Severity,
            bug.AffectedVersion,
            ToDomainUser(bug.CreatedBy),
            ToDomainUser(bug?.AssignedTo),
            bug?.Images?.Select(img=>Convert.FromBase64String(img.ImageData)).ToArray()?? Enumerable.Empty<byte[]>())
        {
            Id=bug.Id,
            DueDate=bug.DueDate
        };
        return domainBug;
    }

    private static Domain.Feature ToDomainFeature(Feature feature)
    {
        var domainFeature=new Domain.Feature(feature.Title, feature.Description, feature.Component, feature.priority, ToDomainUser(feature.CreatedBy),
            ToDomainUser(feature.AssignedTo))
        {
            Id=feature.Id,
            IsCompeted=feature.IsCompeted,
            DueDate=feature.DueDate
        };
        return domainFeature;
    }

    private static Domain.User ToDomainUser(User? user)
    {
        if (user == null) return null!;
        var domainUser = new Domain.User($"{user.Name} {user.Family}")
        {
            Id = user.Id,
        };
        return domainUser;
    }

    private static Domain.ToDoTask ToDomainTask(ToDoTask task)
    {
        var domainTask = new Domain.ToDoTask(
            task.Title,
            task.DueDate,
            ToDomainUser(task.CreatedBy)
            );
       return domainTask;

    }
}
