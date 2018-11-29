import React, { Component } from 'react';

export class PredictImage extends Component {
  displayName = PredictImage.name

  constructor(props) {
    super(props);
    this.state = { prediction: "", loading: true };

    fetch('api/prediction/url', {
      method: 'POST',
      //mode: 'no-cors',
      body: JSON.stringify({
        url: 'https://www.ecigs.net.au/wp-content/uploads/2015/09/red-apple.png',
      })
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ prediction: data, loading: false });
      });
  }

  static renderPrediction(prediction) {
    return (
      <div>
        <h3>Predicted: </h3> <p> {prediction.predictions[0].tagName} </p>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : PredictImage.renderPrediction(this.state.prediction);

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
