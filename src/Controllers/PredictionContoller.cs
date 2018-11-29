using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace src.Controllers
{
    [Route("api/[controller]")]
    public class PredictionController : Controller
    {
        private string temp = "https://www.ecigs.net.au/wp-content/uploads/2015/09/red-apple.png";
        public PredictionController(IHttpClientFactory clientFactory)
        {
            client = clientFactory.CreateClient();
            Console.WriteLine("Hello world");
        }

        private string prediction_endpoint = "http://localhost";
        private readonly HttpClient client;

        [HttpPost("url")]
        public async Task<IActionResult> GetPrediction()
        {
            //var data = new {foo = "bar"};
            //return Json(data);
            var request= new PredictionRequest{url = temp};
            var response = await client.PostAsJsonAsync(prediction_endpoint + "/url", request);
            Console.WriteLine($"response code {response.StatusCode}");
            var body = await response.Content.ReadAsStringAsync();
            Console.WriteLine(body);
            return Ok(body);
        }
    }

    public class PredictionRequest
    {
        public string url {get;set;}
    }
}
