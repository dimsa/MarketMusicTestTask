using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Models;
using DataAccess;
using Model.Models;

namespace Model
{
    public class AppModel : IAppModel
    {
        public AppModel()
        {

        }

        public async Task<int> AddSong(string name, Stream file)
        {
            var filePath = generateFilePath();

            try
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.Seek(0, SeekOrigin.Begin);
                    file.CopyTo(stream);
                }
            }
            catch 
            {                
                return -1;
            }
  

            using (var ctx = new MmDbContext())
            {
                var song = new Song() {Name = name, Path = filePath};
                ctx.Songs.Add(song);
                await ctx.SaveChangesAsync().ConfigureAwait(false);

                return song.Id;
            }
        }

        private string generateFilePath()
        {
            var guid = Guid.NewGuid();
            var dir = $"{AppContext.BaseDirectory}app_data";
            
            Directory.CreateDirectory(dir);
            var filePath = $"{dir}\\{guid}.mp3";
            return filePath;
        }

        public async Task<bool> RemoveSong(int id)
        {
            using (var ctx = new MmDbContext())
            {
                var item = ctx.Songs.FirstOrDefault(it => it.Id == id);
                if (item == null) 
                    return false;

                var path = item.Path;

                // Даже если файлы уже дулаены вручную, удаляем запись из БД
                try
                {
                    File.Delete(path);
                }
                finally
                {
                    var del = ctx.Songs.FirstOrDefault(it => it.Id == id);
                    ctx.Remove(del);
                    await ctx.SaveChangesAsync().ConfigureAwait(false);
                }               
            }

            return true;
        }


        public IEnumerable<SongModel> GetAllSongs()
        {
            using (var ctx = new MmDbContext())
            {
               return ctx.Songs.Select(it => ModelFromEntity(it)).ToList();
            }            
        }

        public SongModel GetSongById(int id)
        {
            using (var ctx = new MmDbContext())
            {
                var song = ctx.Songs.FirstOrDefault(it => it.Id == id);

                return ModelFromEntity(song);
            }
        }

        private static SongModel ModelFromEntity(Song song)
        {
            return new SongModel()
            {
                Id = song.Id,
                // Особо не имеет смысла, но мы можем генерировать ссылку на лету
                Path = $"{song.Id}",
                Name = song.Name
            };
        }

        public byte[] GetSongStream(int id)
        {         
            string filePath;
            using (var ctx = new MmDbContext())
            {
                filePath = ctx.Songs.FirstOrDefault(it => it.Id == id).Path;
            }
            
            using (var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                var result = new byte[stream.Length];
                stream.Read(result, 0, result.Length);

                return result;
            }
        }

        public bool ContainsSong(int id)
        {
            using (var ctx = new MmDbContext())
            {
                return ctx.Songs.Any(it => it.Id == id);
            }
        }
    }
}
