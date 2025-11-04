using AcademyApp.Core.Entities;
using AcademyApp.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AcademyApp.Infrastructure.Data
{
    public class GroupRepository : IGroupRepository
    {
  private readonly AcademyDbContext _context;

     public GroupRepository(AcademyDbContext context)
        {
      _context = context;
 }

        public async Task<Group?> GetByIdAsync(int id)
        {
      return await _context.Groups.FindAsync(id);
        }

        public async Task<IEnumerable<Group>> GetAllAsync()
        {
            return await _context.Groups.ToListAsync();
        }

   public async Task<Group> AddAsync(Group group)
        {
            _context.Groups.Add(group);
 await _context.SaveChangesAsync();
        return group;
        }

        public async Task<Group> UpdateAsync(Group group)
        {
            _context.Groups.Update(group);
            await _context.SaveChangesAsync();
   return group;
        }

    public async Task<bool> DeleteAsync(int id)
        {
       var group = await GetByIdAsync(id);
        if (group == null)
      return false;

         _context.Groups.Remove(group);
  await _context.SaveChangesAsync();
     return true;
        }
    }
}
