using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Model.Models;

namespace Model
{
    public interface IAppModel
    {
        Task<int> AddSong(string name, Stream file);
        Task<bool> RemoveSong(int id);
        IEnumerable<SongModel> GetAllSongs();
        byte[] GetSongStream(int id);
        SongModel GetSongById(int id);
        bool ContainsSong(int id);
    }
}
