using TaskManager.Infrastructure.Entities;

namespace TaskManager.Infrastructure.Mapping;

public static class DomainToData
{
    public static D AsData<T, D>(this T entity) where T : Domain.ToDo, new() where D : ToDo, new()
    {
        if (entity == null) return null!;
        var data = entity switch
        {
            Domain.Bug bug => ToDataBug(bug) as D,
            Domain.Feature feature => ToDataFeature(feature) as D,
            Domain.ToDoTask task => ToDataTask(task) as D,
            Domain.User user => ToDataUser(user) as D,
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
            Id=bug.Id,
            DueDate=bug.DueDate
        };
    }

    private static Feature ToDataFeature(Domain.Feature feature)
    {
        return new(){
            
            Id=feature.Id,
            Title=feature.Title,
            Description=feature.Description, 
            Component=feature.Component,
            priority = feature.priority, 
            IsCompeted=feature.IsCompeted,
            DueDate=feature.DueDate,
            CreatedDate=feature.CreatedDate,
            IsDeleted=feature.IsDeleted,
        };
    }

    private static User ToDataUser(Domain.User user)
    {
        if (user == null) return null!;
        var splitedFullName = user.FullName.Split(" ");
        return new(){
            Id = user.Id,
            Name= splitedFullName[0],
            Family = user.FullName.Replace(splitedFullName[0],string.Empty).Trim(),

        };
    }

    private static ToDoTask ToDataTask(Domain.ToDoTask task)
    {
        return new()
        {
           Title= task.Title,
           DueDate= task.DueDate,
           CreatedDate=task.CreatedDate,
           Id= task.Id,
           IsCompeted=  task.IsCompeted,
           IsDeleted= task.IsDeleted,

        };
           

    }
}
