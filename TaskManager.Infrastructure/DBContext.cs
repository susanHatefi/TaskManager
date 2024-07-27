using Microsoft.EntityFrameworkCore;
using TaskManager.Infrastructure.Entities;
namespace TaskManager.Infrastructure;

public class DBContext: DbContext
{

    public DbSet<Bug> Bugs { get; set; }
    public DbSet<Feature> Features { get; set; }

    public DbSet<ToDoTask> ToDoTasks { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<Image> Images { get; set; }


    public DBContext(DbContextOptions dbContextOptions):base(dbContextOptions)
    {
        
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        
        base.OnConfiguring(optionsBuilder);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
