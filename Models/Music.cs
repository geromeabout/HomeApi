namespace HomeApi.Models;

public class Music
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Artist { get; set; }
    public MusicGenre Genre { get; set; }
}

public enum MusicGenre
{
    Love,
    Rock,
    Lullaby,
    RNB,
    HipHop
}