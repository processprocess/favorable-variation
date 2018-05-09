const contentful = require("contentful");
import App from "containers/App";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Main {
  constructor() {
    this.client = contentful.createClient({
      space: "yc5fqmgrr139",
      accessToken:
        "d9152712e6f661837fbf50a23ed21b1186d4b75d6fae40d7d32b25dfce8c480b"
    });
  }

  async fetch(cb = () => {}) {
    this.client
      .getEntries()
      .then(response => {
        cb({ data: response.items });
      })
      .catch(console.error);
  }

  initialize() {
    this.fetch(({ data }) => {
      ReactDOM.render(
        <Router>
          <Route
            render={props => {
              return <App {...props} content={data} />;
            }}
          />
        </Router>,
        document.querySelector(".wrapper")
      );
    });
  }
}

new Main().initialize();
