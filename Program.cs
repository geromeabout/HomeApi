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

var todos = app.MapGroup("/todos");

todos.MapGet("/",async (HomeDb db) =>
    await db.Todos.ToListAsync()
);

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

    if (todo is null) return Results.NotFound();

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


app.Run();

class HomeDb : DbContext
{
    public HomeDb(DbContextOptions<HomeDb> options) : base(options)
    {

    }
    public DbSet<Todo> Todos {get;set;}
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