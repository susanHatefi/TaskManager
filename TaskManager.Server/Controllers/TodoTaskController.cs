using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Infrastructure.Contracts;
using TaskManager.Infrastructure.Entities;
using TaskManager.Infrastructure.Mapping;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private IRepository<ToDoTask> _repository;
        public ToDoController(IRepository<ToDoTask> repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<ActionResult<Domain.ToDoTask>> Create(Domain.CreateToDoTask todoTask)
        {
            try
            {
                if (todoTask == null)
                {
                    throw new ArgumentNullException(nameof(todoTask));
                }
                //todo 
                var createdBy = new Domain.User("Sara Monfared")
                {
                    Id = Guid.NewGuid()

                };


                var newTodoTask = new Domain.ToDoTask()
                {
                    Title=todoTask.Title,
                    DueDate=todoTask.DueDate,
                    Description=todoTask.Description,
                };
                var savedTodoTask = await _repository.AddAsync(newTodoTask.AsData<Domain.ToDoTask,ToDoTask>());
                return Ok(savedTodoTask.AsDomain<ToDoTask, Domain.ToDoTask>());

            }
            catch (Exception ex)
            {
                throw;
            }
        }



    }
}
