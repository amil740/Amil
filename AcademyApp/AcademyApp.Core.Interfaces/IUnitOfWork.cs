namespace AcademyApp.Core.Interfaces
{
    public interface IUnitOfWork
    {
   IGroupRepository GroupRepository { get; }
    Task<int> SaveChangesAsync();
        void Dispose();
    }
}
