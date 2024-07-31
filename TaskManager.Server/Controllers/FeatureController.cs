using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Infrastructure.Contracts;
using TaskManager.Infrastructure.Mapping;
using TaskManager.Infrastructure.Entities;

namespace TaskManager.Server.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FeatureController : ControllerBase
    {
        private IRepository<Feature> _repository;
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
    }
}
