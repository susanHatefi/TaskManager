using TaskManager.Infrastructure.DependencyInjection;
using TaskManager.Infrastructure.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDataAccess();
builder.Services.AddRepository<Bug>();
builder.Services.AddRepository<Feature>();
builder.Services.AddRepository<ToDoTask>();


builder.Services.AddControllers();


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
