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
        public  ActionResult<Dictionary<TodoStatus,IEnumerable<ToDo>>> All()
        {
            try
            {
                var concurrentBag=new ConcurrentBag<IEnumerable<ToDo>>();
                Parallel.Invoke(
                   async () =>
                    {
                        var collection=await _repository.GetAllAsync();
                        concurrentBag.Add(collection);

                    },
                   async () =>
                   {
                       var collection = await _featureRepository.GetAllAsync();
                       concurrentBag.Add(collection);
                   },
                   async () =>
                   {
                       var collection = await _bugRepository.GetAllAsync();
                       concurrentBag.Add(collection);


                   }
                    );
                var dictionary=new Dictionary<TodoStatus, IEnumerable<ToDo>>();
                foreach(var collection in concurrentBag)
                {
                    foreach(var item in collection)
                    {
                        if (dictionary.Keys.Contains(item.Status))
                        {
                            var newList = dictionary[item.Status].ToList();
                            newList.Add(item);
                            dictionary[item.Status]= newList.AsEnumerable();
                        }
                        else
                        {
                            var newItem = new List<ToDo>() { item };
                            dictionary.Add(item.Status,newItem.AsEnumerable());

                        }
                    }
                }
                return Ok(dictionary);
            }
            catch (Exception ex) {
                throw;
            }
            
        }
        private void AddToCollectionItemsToConCurrentDictionary(IEnumerable<ToDo> collection,ref ConcurrentDictionary<TodoStatus,IEnumerable<ToDo>> concurrentDictionary)
        {

            foreach (var item in collection)
            {
                if (concurrentDictionary.Keys.Contains(item.Status))
                {
                    concurrentDictionary[item.Status].Append(item);
                }
                else
                {
                    concurrentDictionary.GetOrAdd(item.Status, new[] { item });
                }
            }
        }

    }
}
