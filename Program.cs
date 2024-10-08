using HomeApi.Data;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;

//var builder = WebApplication.CreateBuilder(args);

//custom webrootpath
var builder = WebApplication.CreateBuilder(new WebApplicationOptions {
    WebRootPath = "ClientApp"
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//cors
builder.Services.AddCors(c => 
     {
        c.AddPolicy("AllowAll", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
    });
    
//builder.Services.AddSwaggerGen();
var pomelo = builder.Configuration.GetConnectionString("AppConn");
builder.Services.AddDbContext<HomeDbContext>(opt => opt.UseMySql(pomelo, ServerVersion.AutoDetect(pomelo)));

var app = builder.Build();

//forwarded headers
app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
    });
    
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseSwagger();
    //app.UseSwaggerUI();
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

//cors
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

//app.UseHttpsRedirection();

//app.UseAuthorization();

app.UseDefaultFiles();

app.UseStaticFiles();

app.MapControllers();

app.Run();
