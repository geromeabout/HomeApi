using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var cstring = builder.Configuration.GetConnectionString("AppConn");
builder.Services.AddDbContext<HomeDb>(opt => opt.UseMySql(cstring, ServerVersion.AutoDetect(cstring)));

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
   app.UseDeveloperExceptionPage();
}


app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

//app.UseHttpsRedirection();

app.UseDefaultFiles();

app.UseStaticFiles();

var todos = app.MapGroup("/todos");

todos.MapGet("/",async (HomeDb db) =>
    await db.Todos.ToListAsync());

todos.MapGet("/{id}",async (HomeDb db, int id) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ?   Results.Ok(todo)
            :   Results.NotFound()
);

todos.MapPost("/", async (HomeDb db, Todo todo) =>
    {
        var newTodo = new Todo
        {
            Name = todo.Name,
            IsComplete = todo.IsComplete,
            DateAdded = DateTime.Now
        };
        db.Todos.Add(newTodo);
        await db.SaveChangesAsync();
        return Results.Created($"/todos/{newTodo.Id}", newTodo);
    }
);

todos.MapPut("/{id}", async (int id, HomeDb db, Todo todo) =>
{
    var entity = await db.Todos.FindAsync(id);

    if (entity is null) return Results.NotFound();

    entity.Name = todo.Name;
    entity.IsComplete = todo.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

todos.MapDelete("/{id}", async (int id, HomeDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

var movies = app.MapGroup("/movies");

movies.MapGet("/", async (HomeDb db) =>
    await db.Movies.ToListAsync()
);

movies.MapGet("/{id}", async (HomeDb db, int id) =>
    await db.Movies.FindAsync(id)
        is Movie movie
            ?   Results.Ok(movie)
            :   Results.NotFound()
);

movies.MapPost("/", async (HomeDb db, Movie movie) =>
    {
        db.Movies.Add(movie);
        await db.SaveChangesAsync();
    });

movies.MapPut("/{id}", async (HomeDb db, int id, Movie movie) =>
    {
        var entity = await db.Movies.FindAsync(id);

        if (entity is null) return Results.NotFound();

        entity.Title = movie.Title;
        entity.Description = movie.Description;
        entity.ImageUrl = movie.ImageUrl;
        entity.Artist = movie.Artist;
        entity.Genre = movie.Genre;
        entity.DateRelease = movie.DateRelease;

        await db.SaveChangesAsync();

        return Results.NoContent();
    });

movies.MapDelete("/{id}", async (HomeDb db, int id) =>
    {
        if (await db.Movies.FindAsync(id) is Movie movie)
        {
            db.Movies.Remove(movie);
            await db.SaveChangesAsync();
            return Results.NoContent();
        }
        return Results.NotFound();
    });

var music = app.MapGroup("/music");

music.MapGet("/", async (HomeDb db) =>
    await db.Music.ToListAsync()
);

music.MapGet("/{id}", async (HomeDb db, int id) =>
    await db.Music.FindAsync(id)
        is Music music
            ?   Results.Ok(music)
            :   Results.NotFound()
);

music.MapPost("/", async (HomeDb db, Music music) =>
    {
        db.Music.Add(music);
        await db.SaveChangesAsync();
    });

music.MapPut("/{id}", async (HomeDb db, int id, Music music) =>
    {
        var entity = await db.Music.FindAsync(id);

        if (entity is null) return Results.NotFound();

        entity.Title = music.Title;
        entity.Description = music.Description;
        entity.ImageUrl = music.ImageUrl;
        entity.Artist = music.Artist;
        entity.Genre = music.Genre;
        entity.DateRelease = music.DateRelease;

        await db.SaveChangesAsync();

        return Results.NoContent();
    });

music.MapDelete("/{id}", async (HomeDb db, int id) =>
    {
        if (await db.Music.FindAsync(id) is Music music)
        {
            db.Music.Remove(music);
            await db.SaveChangesAsync();
            return Results.NoContent();
        }
        return Results.NotFound();
    });

app.Run();

class HomeDb : DbContext
{
    public HomeDb(DbContextOptions<HomeDb> options) : base(options)
    {

    }
    public DbSet<Todo> Todos {get;set;}
    public DbSet<Music> Music { get; set; }
    public DbSet<Movie> Movies { get; set; }
}

class Todo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsComplete { get; set; }
    public DateTime DateAdded { get; set; }
}

class Movie
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Artist { get; set; }
    public string ImageUrl { get; set; }
    public MovieGenre Genre { get; set; }
    public DateTime DateRelease { get; set; }
}

enum MovieGenre
{
    Horror,
    Action,
    Comedy,
    Drama,
    Romance,
    Musical,
    SciFi
}

class Music
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Artist { get; set; }
    public string ImageUrl { get; set; }
    public MusicGenre Genre { get; set; }
    public DateTime DateRelease { get; set; }

}

enum MusicGenre
{
    Pop,
    Rock,
    Classical,
    RNB,
    HipHop,
    Religious,
    Country
}