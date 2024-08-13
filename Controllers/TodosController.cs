using System.Data.Common;
using HomeApi.Data;
using HomeApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    public HomeDbContext _db;

    public TodosController(HomeDbContext db)
    {
        _db = db;
    }
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_db.Todos.ToList());
    }
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        return Ok(_db.Todos.Find(id));
    }
    [HttpPost]
    public IActionResult Post(Todo todo)
    {
        _db.Todos.Add(todo);
        _db.SaveChanges();
        return Ok("Added.");
    }
    [HttpPut("{id}")]
    public IActionResult Put(int id, Todo todo)
    {
        var entity = _db.Todos.Find(id);
        if (entity is null) return BadRequest();

        entity.Name = todo.Name;
        entity.IsComplete = todo.IsComplete;
        entity.DateAdded = todo.DateAdded;

        _db.SaveChanges();

        return Ok("Updated.");
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var entity = _db.Todos.Find(id);
        if (entity is null) return BadRequest();

        _db.Todos.Remove(entity);
        _db.SaveChanges();

        return Ok("Deleted.");
    }
}