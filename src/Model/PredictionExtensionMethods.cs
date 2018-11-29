using System;
using System.Collections.Generic;
using System.Linq;

namespace src.Model
{
    public static class PredictionExtensionMethods
    {
        public static void Reorder(this PredictionResponse response)
        {
            response.predictions = response.predictions.OrderBy(p => p.probability).Reverse().ToList();
        }
    }
}