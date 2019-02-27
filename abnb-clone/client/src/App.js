import React from "react";
import Homepage from "./Homepage";
import SearchResults from "./SearchResults";
import House from "./House";
import Header from "./Header";
import Footer from "./Footer";
import Context from "./Context";
import { BrowserRouter, Route } from "react-router-dom";
import api from "./api/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { houseListings: [] };
  }

  componentDidMount() {
    api.getAllData().then(res => this.setState({ houseListings: [res] }));
  }

  handleIdRoute = async id => {
    const result = await api.getOneData(id);
    this.setState({ currentListing: result });
  };

  clickHandler = (history, id, redirect) => {
    const string = redirect ? '/house-redirect' : '/house-listing'
    history.push("/" + id + string);
  };

  homepageHandler = history => {
    history.push("/");
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>

            <Route
              exact
              path="/"
              render={({ match, location, history }) => (
                <Context.Provider
                  value={{
                    headerColor: "white",
                    borderColor: "transparent",
                    headerSearch: "none"
                  }}
                >
                  <Header
                    homepageHandler={this.homepageHandler}
                    history={history}
                  />
                  <Homepage
                    clickHandler={this.clickHandler}
                    history={history}
                  />
                  <Footer />
                </Context.Provider>
              )}
            />

            <Route
              path="/:query/search-results"
              render={({ match, location, history }) => (
                <Context.Provider
                  value={{
                    headerColor: "black",
                    borderColor: "lightgray",
                    headerSearch: "block"
                  }}
                >
                  <Header
                    homepageHandler={this.homepageHandler}
                    history={history}
                  />
                  <SearchResults
                    query={match.params.query}
                    history={history}
                    clickHandler={this.clickHandler}
                  />
                  <Footer />
                </Context.Provider>
              )}
            />

            <Route
              path="/:_id/house-listing"
              render={({ match, location, history }) => (
                <Context.Provider
                  value={{
                    headerColor: "black",
                    borderColor: "lightgray",
                    headerSearch: "block"
                  }}
                >
                  <Header
                    homepageHandler={this.homepageHandler}
                    history={history}
                  />
                  <House
                    cb={() => this.handleIdRoute(match.params._id)}
                    home={this.state.currentListing}
                    history={history}
                    clickHandler={this.clickHandler}
                  />
                  <Footer />
                </Context.Provider>
              )}
            />

            <Route
              path="/:query/search-redirect"
              render={({ match, location, history }) =>
                setTimeout(() =>
                  history.push("/" + match.params.query + "/search-results")
                )
              }
            />
            
            <Route
              path="/:_id/house-redirect"
              render={({ match, location, history }) =>
                setTimeout(() =>
                  history.push("/" + match.params._id + "/house-listing")
                )
              }
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
