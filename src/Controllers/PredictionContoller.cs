using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using src.Model;

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
        public async Task<IActionResult> GetPrediction([FromBody] PredictionRequestByUrl request)
        {
            Console.WriteLine($"Got a request, url: {request.url}");
            if(string.IsNullOrEmpty(request.url)) {
                throw new NullReferenceException("URL cannot be empty");
            }
            var response = await client.PostAsJsonAsync(prediction_endpoint + "/url", request);
            Console.WriteLine($"response code {response.StatusCode}");
            var body = await response.Content.ReadAsStringAsync();
            Console.WriteLine(body);
            var data = JsonConvert.DeserializeObject<PredictionResponse>(body);
            return Ok(data);
        }
    }
}
