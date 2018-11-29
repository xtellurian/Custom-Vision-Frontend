import React, { Component } from 'react';

export class PredictImage extends Component {
  displayName = PredictImage.name

  constructor(props) {
    super(props);
    this.state = { prediction: "", loading: true, url: "https://www.ecigs.net.au/wp-content/uploads/2015/09/red-apple.png" };

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  makePrediction() {
    fetch('api/prediction/url', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: this.state.url,
      })
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        console.log("data type: " + typeof (data));
        this.setState({ prediction: data, loading: false });
      });
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    this.makePrediction();
    event.preventDefault();
  }

  static renderPrediction(p) {
    return (
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Tag Name</th>
              <th>Probability</th>
            </tr>
          </thead>
          <tbody>
            {p.predictions.map(prediction =>
              <tr key={prediction.probability}>
                <td> {prediction.tagName} </td>
                <td>{prediction.probability.toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : PredictImage.renderPrediction(this.state.prediction);

    return (
      <div>
        <h1>Image Prediction</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Image URL:
              <input type="text" name="name" value={this.state.url} onChange={this.handleUrlChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
              ONE
              {contents}
            </div>
            <div className="col-xs-6">
              <img src={this.state.url}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
