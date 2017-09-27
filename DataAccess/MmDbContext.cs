using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class MmDbContext: DbContext
    {
        public MmDbContext()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(MmDbCommon.ConnectionString);
        }

        public MmDbContext(DbContextOptions<MmDbContext> options)
            : base(options)
        { 

        }

        public DbSet<Song> Songs { get; set; }
    }
}
