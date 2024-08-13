using HomeApi.Data;
using HomeApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    public HomeDbContext _db;
    public MoviesController(HomeDbContext db)
    {
        _db = db;
    }
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_db.Movies.ToList());
    }
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        return Ok(_db.Movies.Find(id));
    }
    [HttpPost]
    public IActionResult Post(Movie movie)
    {
        _db.Movies.Add(movie);
        _db.SaveChanges();
        return Ok("Added.");
    }
    [HttpPut("{id}")]
    public IActionResult Put(Movie movie, int id)
    {
        var entity = _db.Movies.Find(id);
        if (entity is null) return NotFound();

        entity.Title = movie.Title;
        entity.Actor = movie.Actor;
        entity.Genre = movie.Genre;

        _db.SaveChanges();
        return Ok("Updated.");
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var entity = _db.Movies.Find(id);
        if (entity is null) return NotFound();

        _db.Movies.Remove(entity);
        _db.SaveChanges();

        return Ok("Deleted.");
    }
}