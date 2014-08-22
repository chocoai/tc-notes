using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TC4Blogs.Models
{
    public class BlogsActList
    {
        public List<BlogsActModel> actlist { get; set; }
        public string acttitle { get; set; }
    }
    public class BlogsActModel
    {
        public int id { get; set; }
        public string title { get; set; }
        public string link { get; set; }
        public string price { get; set; }
        public string image { get; set; }
    }
}