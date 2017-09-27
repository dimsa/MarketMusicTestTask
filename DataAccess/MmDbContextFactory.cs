using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DataAccess
{
    class MmDbContextFactory : IDesignTimeDbContextFactory<MmDbContext>
    {
        public MmDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<MmDbContext>();
            optionsBuilder.UseSqlServer(MmDbCommon.ConnectionString);

            return new MmDbContext(optionsBuilder.Options);
        }
    }
}
