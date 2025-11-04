using AcademyApp.Core.Entities;

namespace AcademyApp.Core.Interfaces
{
    public interface IGroupService
    {
        Task<Group?> GetGroupByIdAsync(int id);
Task<IEnumerable<Group>> GetAllGroupsAsync();
        Task<Group> CreateGroupAsync(Group group);
        Task<Group> UpdateGroupAsync(Group group);
        Task<bool> DeleteGroupAsync(int id);
    }
}
