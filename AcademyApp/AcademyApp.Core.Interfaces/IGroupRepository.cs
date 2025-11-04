using AcademyApp.Core.Entities;

namespace AcademyApp.Core.Interfaces
{
    public interface IGroupRepository
    {
        Task<Group?> GetByIdAsync(int id);
   Task<IEnumerable<Group>> GetAllAsync();
   Task<Group> AddAsync(Group group);
        Task<Group> UpdateAsync(Group group);
    Task<bool> DeleteAsync(int id);
    }
}
