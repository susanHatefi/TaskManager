using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Infrastructure.Contracts;
using TaskManager.Infrastructure.Mapping;
using TaskManager.Infrastructure.Entities;
using TaskManager.Domain.Enum;

namespace TaskManager.Server.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FeatureController : ControllerBase
    {
        private IRepository<Feature> _repository;
            private readonly short _minimumPriority = 1;
            private readonly short _maximumPriority = 4;
        public FeatureController(IRepository<Feature> repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<ActionResult<Domain.Feature>> Create(Domain.CreateFeature feature)
        {
            try
            {
                if (feature == null) {
                   throw new ArgumentNullException(nameof(feature));
                }
                if (feature.Priority < _minimumPriority || feature.Priority > _maximumPriority)
                {
                    throw new ArgumentOutOfRangeException(nameof(feature.Priority));
                }
                //todo 
                var createdBy = new Domain.User("Sara Monfared")
                {
                    Id = Guid.NewGuid()

                };
                var newFeature=new Domain.Feature(feature.Component, feature.Priority)
                {
                    Title=feature.Title,
                    Description=feature.Description,
                    AssignedTo=feature.AssignedTo,
                    DueDate=feature.DueDate,
                    
                };
                var savedFeature =await _repository.AddAsync(newFeature?.AsData<Domain.Feature,Feature>());
                return Ok(savedFeature.AsDomain<Feature,Domain.Feature>());

            }
            catch (Exception ex) {
                throw;
            }
        }

        [HttpPut]
        public async Task Update(Domain.UpdateFeature feature)
        {
            try
            {
                if(feature == null)
                {
                    throw new ArgumentNullException(nameof(feature));

                }
                TodoStatus status;

                if (!Enum.TryParse<TodoStatus>(feature.status, out status))
                {
                    throw new ArgumentException(nameof(status));
                }
                if(feature.Priority < _minimumPriority || feature.Priority > _maximumPriority)
                {
                    throw new ArgumentOutOfRangeException(nameof(feature.Priority));
                }
                var modifiedFeature=new Domain.Feature(feature.Component, feature.Priority) with
                {
                    Id = feature.Id,
                    AssignedTo = feature.AssignedTo,
                    Description = feature.Description,
                    Title = feature.Title,
                    DueDate = feature.DueDate,
                    IsCompeted = feature.IsCompeleted,
                    status = status

                };
                await _repository.UpdateAsync(modifiedFeature.AsData<Domain.Feature,Feature>());


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
