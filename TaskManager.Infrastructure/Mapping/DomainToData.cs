using TaskManager.Infrastructure.Entities;

namespace TaskManager.Infrastructure.Mapping;

public static class DomainToData
{
    public static D AsData<T, D>(this T entity) where T :  Domain.IToDo where D : ToDo, new()
    {
        if (entity == null) return null!;
        var data = entity switch
        {
            Domain.Bug bug => ToDataBug(bug) as D,
            Domain.Feature feature => ToDataFeature(feature) as D,
            Domain.ToDoTask task => ToDataTask(task) as D,
            _=> null
        };
        return data;

    }

    private static Bug ToDataBug(Domain.Bug bug)
    {
        return new Bug(){
            Title=bug.Title,
            Description=bug.Description,
            Severity=bug.Severity,
            AffectedVersion=bug.AffectedVersion,
            Images=bug?.Images?.Select(img=>new Image { ImageData=Convert.ToBase64String(img)}).ToArray(),
            Id=bug.Id??Guid.NewGuid(),
            DueDate=bug.DueDate,
            AssignedTo = ToDataUser(bug.AssignedTo),

            Status = bug.status
        };
    }

    private static Feature ToDataFeature(Domain.Feature feature)
    {
        return new(){
            
            Id=feature.Id ?? Guid.NewGuid(),
            Title=feature.Title,
            Description=feature.Description, 
            Component=feature.Component,
            priority = feature.priority, 
            IsCompeted=feature.IsCompeted,
            DueDate=feature.DueDate,
            CreatedDate=feature.CreatedDate,
            IsDeleted=feature.IsDeleted,
            AssignedTo=ToDataUser(feature.AssignedTo),
            CreatedBy=ToDataUser(feature.CreatedBy),
            Status=feature.status
        };
    }

    private static User ToDataUser(Domain.User user)
    {
        if (user == null) return null!;
        return new(){
            Id = user.Id,
            FullName = user.FullName

        };
    }

    private static ToDoTask ToDataTask(Domain.ToDoTask task)
    {
        return new()
        {
           Title= task.Title,
           Description=task.Description,
           DueDate= task.DueDate,
           CreatedDate=task.CreatedDate,
           Id= task.Id ?? Guid.NewGuid(),
           IsCompeted=  task.IsCompeted,
           IsDeleted= task.IsDeleted,
           Status=task.status
        };
           

    }
}
