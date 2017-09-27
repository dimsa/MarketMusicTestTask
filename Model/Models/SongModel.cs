using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Model.Models
{
    [JsonObject]
    public class SongModel
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "path")]
        public string Path { get; set; }
    }
}
