using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using TC4Blogs.Models;

namespace TC4Blogs.Controllers
{
    public class XMLController : Controller
    {
        //
        // GET: /XML/
        public ActionResult Index()
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(@"E:\Codes\MVC5Demo1\TC4Blogs\TC4Blogs\test1.xml");
            XmlNodeList xmlNodeList = doc.SelectSingleNode("SummerAct").ChildNodes;
            BlogsActList list = new BlogsActList();
            foreach (XmlNode xoj in xmlNodeList)
            {
                if (xoj.SelectSingleNode("ActTitle").InnerText == "毕业季")
                {
                    list.acttitle = xoj.SelectSingleNode("ActTitle").InnerText;
                    list.actlist = new List<BlogsActModel>();
                    foreach (XmlNode aoj in xoj.SelectNodes("ActInfo/Infos"))
                    {
                        BlogsActModel acts = new BlogsActModel();
                        acts.id = int.Parse(aoj.SelectSingleNode("ID").InnerText);
                        acts.image = aoj.SelectSingleNode("Image").InnerText;
                        acts.price = aoj.SelectSingleNode("PRICE").InnerText;
                        acts.title = aoj.SelectSingleNode("TITLE").InnerText;
                        acts.link = aoj.SelectSingleNode("LINK").InnerText;
                        list.actlist.Add(acts);
                    }

                }
            }

            return View(list);
        }
    }
}