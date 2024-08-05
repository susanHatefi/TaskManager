using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Concurrent;
using TaskManager.Domain.Enum;
using TaskManager.Infrastructure.Contracts;
using TaskManager.Infrastructure.Entities;
using TaskManager.Infrastructure.Mapping;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class ToDosController : ControllerBase
    {
        private IRepository<ToDoTask> _repository;
        private IRepository<Bug> _bugRepository;
        private IRepository<Feature> _featureRepository;
        public ToDosController(IRepository<ToDoTask> taskRepository, IRepository<Feature> featureRepository, IRepository<Bug> bugRepository)
        {
            _repository = taskRepository;
            _featureRepository =featureRepository;
            _bugRepository = bugRepository;
        }

        [HttpGet]
        public  ActionResult<Dictionary<TodoStatus,IEnumerable<Domain.BoardTasks>>> All()
        {
            try
            {
                var concurrentBag=new ConcurrentBag<IEnumerable<Domain.IToDo>>();
                Parallel.Invoke(
                   async () =>
                    {
                        var collection=await _repository.GetAllAsync();
                        concurrentBag.Add(collection.Select(item=>item.AsDomain<ToDoTask,Domain.ToDoTask>()));

                    },
                   async () =>
                   {
                       var collection = await _featureRepository.GetAllAsync();
                       concurrentBag.Add(collection.Select(item=> item.AsDomain<Feature, Domain.Feature>()));
                   },
                   async () =>
                   {
                       var collection = await _bugRepository.GetAllAsync();
                       concurrentBag.Add(collection.Select(item => item.AsDomain<Bug, Domain.Bug>()));


                   }
                    );
                var dictionary=new Dictionary<TodoStatus, IEnumerable<Domain.BoardTasks>>();
                foreach(var collection in concurrentBag)
                {
                    foreach(var item in collection)
                    {
                        var boardItem = ConvertIToDoToBoardTask(item);
                        
                        if (dictionary.Keys.Contains(boardItem.status))
                        {
                            var newList = dictionary[boardItem.status].ToList();
                            newList.Add(boardItem);
                            dictionary[boardItem.status]= newList.AsEnumerable();
                        }
                        else
                        {
                            var newItem = new List<Domain.BoardTasks>() { boardItem };
                            dictionary.Add(boardItem.status,newItem.AsEnumerable());

                        }
                    }
                }
                return Ok(dictionary);
            }
            catch (Exception ex) {
                throw;
            }
            
        }
       private Domain.BoardTasks ConvertIToDoToBoardTask(Domain.IToDo item)
        {
            var newItem = item switch
            {
                Domain.Bug => new Domain.BoardTasks()
                {
                    Id = ((Domain.Bug)((Domain.Bug)item)).Id,
                    CreatedBy = ((Domain.Bug)item).CreatedBy,
                    AffectedVersion = ((Domain.Bug)item).AffectedVersion,
                    CreatedDate = ((Domain.Bug)item).CreatedDate,
                    Description = ((Domain.Bug)item).Description,
                    DueDate = ((Domain.Bug)item).DueDate,
                    Images = ((Domain.Bug)item).Images,
                    IsCompleted = ((Domain.Bug)item).IsCompleted,
                    IsDeleted = ((Domain.Bug)item).IsDeleted,
                    status = ((Domain.Bug)item).status,
                    Severity = ((Domain.Bug)item).Severity.ToString(),
                    Title = ((Domain.Bug)item).Title,
                    AssignedTo = ((Domain.Bug)item).AssignedTo,
                    TaskType=TaskType.Bug

                },
                Domain.Feature => new Domain.BoardTasks()
                {
                    Id = ((Domain.Feature)item).Id,
                    CreatedBy = ((Domain.Feature)item).CreatedBy,
                    Component = ((Domain.Feature)item).Component,
                    CreatedDate = ((Domain.Feature)item).CreatedDate,
                    Description = ((Domain.Feature)item).Description,
                    DueDate = ((Domain.Feature)item).DueDate,
                    IsCompleted = ((Domain.Feature)item).IsCompleted,
                    IsDeleted = ((Domain.Feature)item).IsDeleted,
                    priority = ((Domain.Feature)item).priority,
                    status = ((Domain.Feature)item).status,
                    Title = ((Domain.Feature)item).Title,
                    AssignedTo = ((Domain.Feature)item).AssignedTo,
                    TaskType = TaskType.Feature

                },
                Domain.ToDoTask => new Domain.BoardTasks()
                {
                    Id = ((Domain.ToDoTask)item).Id,
                    CreatedBy = ((Domain.ToDoTask)item).CreatedBy,
                    CreatedDate = ((Domain.ToDoTask)item).CreatedDate,
                    Description = ((Domain.ToDoTask)item).Description,
                    DueDate = ((Domain.ToDoTask)item).DueDate,
                    IsCompleted = ((Domain.ToDoTask)item).IsCompleted,
                    IsDeleted = ((Domain.ToDoTask)item).IsDeleted,
                    status = ((Domain.ToDoTask)item).status,
                    Title = ((Domain.ToDoTask)item).Title,
                    AssignedTo = ((Domain.ToDoTask)item).AssignedTo,
                    TaskType = TaskType.TodoTask

                },
            };

            return newItem;
        }

    }
}
