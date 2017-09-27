using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using Model;
using Model.Models;
using Newtonsoft.Json;

namespace Service.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAngularLocalHost")]
    public class SongsController : Controller
    {
        private readonly IAppModel _model;

        public SongsController(IAppModel model)
        {
            _model = model;
        }

        [HttpGet]
        public string Get()
        {
            var list = _model.GetAllSongs();
            return JsonConvert.SerializeObject(list);
        }

        [HttpGet("{id}")]
        public IActionResult Download(int id)
        {
            if (!_model.ContainsSong(id))
                return NotFound();

            var stream = _model.GetSongStream(id);
            var response = File(stream, "application/octet-stream"); 
            return response;
        }
        
        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            int newId;
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                newId = await _model.AddSong(file.FileName, stream);
            }
            var createdSong = _model.GetSongById(newId);
            return Ok(JsonConvert.SerializeObject(createdSong));
        }                       

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]string value)
        {
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {            
            if (!_model.ContainsSong(id))
                return NotFound();

            var deletedSong = _model.GetSongById(id);
            await _model.RemoveSong(id);
            return Ok(JsonConvert.SerializeObject(deletedSong));
        }
    }
}
