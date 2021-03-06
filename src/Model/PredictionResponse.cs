using System;
using System.Collections.Generic;

namespace src.Model
{
    public class PredictionRequestByUrl
    {
        public string url { get; set; }
    }
    public class Prediction
    {
        public object boundingBox { get; set; }
        public double probability { get; set; }
        public string tagId { get; set; }
        public string tagName { get; set; }
    }

    public class PredictionResponse
    {
        public DateTime created { get; set; }
        public string id { get; set; }
        public string iteration { get; set; }
        public List<Prediction> predictions { get; set; }
        public string project { get; set; }
    }
}