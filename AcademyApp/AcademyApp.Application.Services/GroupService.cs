using AcademyApp.Core.Entities;
using AcademyApp.Core.Interfaces;

namespace AcademyApp.Application.Services
{
    public class GroupService : IGroupService
    {
        private readonly IUnitOfWork _unitOfWork;

        public GroupService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Group?> GetGroupByIdAsync(int id)
        {
            return await _unitOfWork.GroupRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Group>> GetAllGroupsAsync()
        {
            return await _unitOfWork.GroupRepository.GetAllAsync();
        }

        public async Task<Group> CreateGroupAsync(Group group)
        {
            return await _unitOfWork.GroupRepository.AddAsync(group);
        }

        public async Task<Group> UpdateGroupAsync(Group group)
        {
            return await _unitOfWork.GroupRepository.UpdateAsync(group);
        }

        public async Task<bool> DeleteGroupAsync(int id)
        {
            return await _unitOfWork.GroupRepository.DeleteAsync(id);
        }
    }
}
