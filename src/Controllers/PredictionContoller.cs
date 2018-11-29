using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using src.Model;

namespace src.Controllers
{
    [Route("api/[controller]")]
    public class PredictionController : Controller
    {
        public PredictionController(ILogger<PredictionController> logger, IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            client = clientFactory.CreateClient();
            predictionEndpoint = configuration.GetValue<string>("PredictionEndpoint");
            if(string.IsNullOrEmpty(predictionEndpoint))
            {
                throw new NullReferenceException("PredictionEndpoint cannot be null");
            } else {
                logger.LogInformation($"Prediction Endpoint: {predictionEndpoint}");
            }

            this.logger = logger;
        }

        private readonly HttpClient client;
        private readonly string predictionEndpoint;
        private readonly ILogger<PredictionController> logger;

        [HttpPost("url")]
        public async Task<IActionResult> GetPrediction([FromBody] PredictionRequestByUrl request)
        {
            logger.LogInformation($"Got a request, url: {request.url}");
            if(string.IsNullOrEmpty(request.url)) {
                logger.LogError("URL cannot be empty");
                throw new NullReferenceException("URL cannot be empty");
            }
            logger.LogInformation($"Model request path: {predictionEndpoint}/url");
            var response = await client.PostAsJsonAsync(predictionEndpoint + "/url", request);
            logger.LogInformation($"response code {response.StatusCode}");
            var body = await response.Content.ReadAsStringAsync();
            logger.LogDebug(body);
            var data = JsonConvert.DeserializeObject<PredictionResponse>(body);
            data.Reorder();
            return Ok(data);
        }
    }
}
