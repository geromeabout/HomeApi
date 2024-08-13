namespace HomeApi.Models;

public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Actor { get; set; }
    public MovieGenre Genre { get; set; }
}

public enum MovieGenre
{
    Action,
    Horror,
    Comedy,
    Scifi
}