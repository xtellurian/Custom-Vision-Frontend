import React, { Component } from 'react';

export class PredictImage extends Component {
  displayName = PredictImage.name

  constructor(props) {
    super(props);
    this.state = { prediction: {}, predicting: false, url: "" , status: ""};

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
// https://www.ecigs.net.au/wp-content/uploads/2015/09/red-apple.png
  }

  makePrediction() {
    this.setState({predicting: true});
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
        this.setState({ prediction: data, predicting: false });
      }).catch(err => {
        this.setState({predicting: false, status: "error", predicting: false});
      });
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value, loading: true });
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
    let contents = this.state.prediction.predictions == null
      ? <p><em>Loading...</em></p>
      : PredictImage.renderPrediction(this.state.prediction);

    return (
      <div>
        <h2>Image Prediction</h2>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <label>
              <input type="text" placeholder="Paste an image URL" name="name" value={this.state.url} onChange={this.handleUrlChange} />
          </label>
          <br/>
          <input type="submit" value="Predict" />
        </form>
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
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
