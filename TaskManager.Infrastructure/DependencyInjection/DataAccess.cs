using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.ComponentModel.Design;
using TaskManager.Infrastructure.Contracts;
using TaskManager.Infrastructure.Entities;
using TaskManager.Infrastructure.Repositories;
using TaskManager.Infrastructure.Settings;

namespace TaskManager.Infrastructure.DependencyInjection;

public static class DataAccess
{
    public static IServiceCollection AddDataAccess(this IServiceCollection service)
    {
        service.AddOptions<SQLConnectionSetting>().Configure<IConfiguration>((options, configuration) =>
        {
            configuration.GetSection(nameof(SQLConnectionSetting)).Bind(options);
        });

                service.AddDbContext<DBContext>((serviceProvider,options) =>
                {
                    var sqlConfig = serviceProvider.GetService<IOptions<SQLConnectionSetting>>().Value;

                    options.UseSqlServer(sqlConfig.ConnectionString);
           
                    }, ServiceLifetime.Singleton);


        return service;
    }

    public static IServiceCollection AddRepository<T>(this IServiceCollection service) where T: ToDo, new()
    {
        service.AddTransient<IRepository<T>>((provider) =>
        {
            var sqlConfig=provider.GetService<IOptions<SQLConnectionSetting>>().Value;
            if (sqlConfig.IsEnable)
            {
                var dbContext=provider.GetRequiredService<DbContext>();
                return new SqlRepository<T>(dbContext);
            }
            else
            {
                return new InnerMemoryRepository<T>();

            }
        });
        return service;
    }
}
