namespace TaskManager.Domain;

public record Feature(string Component, int priority):ToDoTask();
