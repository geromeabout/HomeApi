using HomeApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeApi.Data;

public class HomeDbContext : DbContext
{
    public HomeDbContext(DbContextOptions<HomeDbContext> options) : base (options)
    { 
    }
    public DbSet<Todo> Todos { get; set; }
    public DbSet<Music> Music { get; set; }
}