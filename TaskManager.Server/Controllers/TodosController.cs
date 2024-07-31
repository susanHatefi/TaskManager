using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;
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
        public async Task<ConcurrentBag<IEnumerable<IToDo>>> All() {
        
            var concurrectBag=new ConcurrentBag<IEnumerable<IToDo>>();
            
            await Parallel.ForAsync(0, 3, async (i,token) =>
            {
                var result= i switch
                {
                    0 => await _repository.GetAllAsync(),
                    1 => await _featureRepository.GetAllAsync(),
                    2 => await _bugRepository.GetAllAsync(),
                };
                concurrectBag.Add(result);
            
            });

            return concurrectBag;
        }

    }
}
