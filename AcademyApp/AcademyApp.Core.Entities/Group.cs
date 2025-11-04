namespace AcademyApp.Core.Entities
{
    public class Group
    {
        public int Id { get; set; }
   public required string Name { get; set; }
        public required string Description { get; set; }
      public int Limit { get; set; }
    }
}
