using HomeApi.Data;
using HomeApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MusicController : ControllerBase
{
    public HomeDbContext _db;
    public MusicController(HomeDbContext db)
    {
        _db = db;
    }
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_db.Music.ToList());
    }
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        return Ok(_db.Music.Find(id));
    }
    [HttpPost]
    public IActionResult Post(Music music)
    {
        _db.Music.Add(music);
        _db.SaveChanges();
        return Ok("Added.");
    }
    [HttpPut("{id}")]
    public IActionResult Put(int id, Music music)
    {
        var entity = _db.Music.Find(id);
        if (entity is null) return BadRequest();

        entity.Title = music.Title;
        entity.Artist = music.Artist;
        
        _db.SaveChanges();
        return Ok("Updated.");
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var entity = _db.Music.Find(id);
        if (entity is null) return BadRequest();

        _db.Music.Remove(entity);
        _db.SaveChanges();
        return Ok("Deleted.");
    }
}