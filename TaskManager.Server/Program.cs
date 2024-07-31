using TaskManager.Infrastructure.DependencyInjection;
using TaskManager.Infrastructure.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDataAccess();
builder.Services.AddRepository<Bug>();
builder.Services.AddRepository<Feature>();
builder.Services.AddRepository<ToDoTask>();
builder.Services.AddCors(option =>
{
    option.AddPolicy("all", policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});



var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
    app.UseCors("all");

app.UseHttpsRedirection();

app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
app.UseSwagger();
app.UseSwaggerUI();

}

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
