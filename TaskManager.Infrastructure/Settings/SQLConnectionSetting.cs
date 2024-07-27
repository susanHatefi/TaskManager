namespace TaskManager.Infrastructure.Settings;

public class SQLConnectionSetting
{
    public string DataBase { get; set; }
    public string Server { get; set; }

    public string UserName { get; set; }

    public string Password { get; set; }

    public bool IsEnable { get; set; }

    public string ConnectionString => $"Server={Server};Database={DataBase};User Id={UserName};Password={Password};";
}
