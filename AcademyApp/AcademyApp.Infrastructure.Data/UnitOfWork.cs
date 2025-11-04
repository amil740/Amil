using AcademyApp.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AcademyApp.Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AcademyDbContext _context;
        private IGroupRepository? _groupRepository;

        public UnitOfWork(AcademyDbContext context)
        {
            _context = context;
        }

        public IGroupRepository GroupRepository
        {
            get
            {
                _groupRepository ??= new GroupRepository(_context);
                return _groupRepository;
            }
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context?.Dispose();
        }
    }
}
