﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Domain.Enum;
using TaskManager.Infrastructure.Contracts;
using TaskManager.Infrastructure.Entities;
using TaskManager.Infrastructure.Mapping;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class BugController : ControllerBase
    {
        private IRepository<Bug> _repository;
        public BugController(IRepository<Bug> repository)
        {
            _repository= repository;
        }

        [HttpPost]
        public async Task<ActionResult<Domain.Bug>> Create(Domain.CreateBug bug)
        {
            try
            {
                if (bug == null) { 
                    throw new ArgumentNullException(nameof(bug));
                }
                //todo
                var createdBy = new Domain.User("Sara Monfared")
                {
                    Id = Guid.NewGuid()

                };
                Severity bugSeverity=Severity.Minor;
                Enum.TryParse<Severity>( bug.Severity, out bugSeverity);
                var newBug = new Domain.Bug(bugSeverity, bug.AffectedVersion, bug.Images)
                {
                    Title=bug.Title,
                    Description=bug.Description,
                    DueDate=bug.DueDate,
                    AssignedTo=bug.AssignedTo,
                };
            var savedBug = await _repository.AddAsync(newBug.AsData<Domain.Bug,Bug>());
            return Ok(savedBug?.AsDomain<Bug,Domain.Bug>());
            }
            catch (Exception ex) {
                throw;
            }

        }

        [HttpPut]
        public async Task Update(Domain.UpdateBug bug)
        {
            try
            {
                if (bug == null)
                {
                    throw new ArgumentNullException(nameof(bug));

                }
                TodoStatus status;
                    
                if (!Enum.TryParse<TodoStatus>(bug.status, out status))
                {
                    throw new ArgumentException(nameof(status));
                }

                Severity severity;

                if (!Enum.TryParse<Severity>(bug.Severity, out severity))
                {
                    throw new ArgumentException(nameof(bug.Severity));
                }
                var modifiedBug = new Domain.Bug(severity,bug.AffectedVersion,bug.Images) with
                {
                    Id = bug.Id,
                    AssignedTo = bug.AssignedTo,
                    Description = bug.Description,
                    Title = bug.Title,
                    DueDate = bug.DueDate,
                    IsCompeted = bug.IsCompeleted,
                    status = status,
                    

                };
                await _repository.UpdateAsync(modifiedBug.AsData<Domain.Bug, Bug>());


            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpDelete]
        public async Task Delete(Guid Id)
        {
            await _repository.SoftDeleteAsync(Id);
        }
    }
}
