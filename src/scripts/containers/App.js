import browser from "bowser";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import InvalidBrowser from "utilities/InvalidBrowser/InvalidBrowser";
import Header from "partials/Header";
import sleep from "utilities/sleep";
import APP_CONFIG from "config/appConfig";
// import appContextProvider from "containers/appContextProvider";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "views/home";
import About from "views/about";

export default class App extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    content: PropTypes.array
  };

  // static contextTypes = {
  //   content: PropTypes.object
  // };

  constructor() {
    super();
    this.state = {
      accessible: false
    };
  }

  componentDidMount() {
    if (this.isValidBrowser()) {
      sleep(APP_CONFIG.loadingDuration).then(() => {
        this.hideLoader();
      });
    } else {
      this.hideLoader();
    }
  }

  hideLoader() {
    document.querySelector(".site-loader").className += " site-loader--loaded";
  }

  isValidBrowser() {
    return !(browser.msie && parseInt(browser.version) < 11);
  }

  render() {
    const { pathname } = this.props.location;
    return this.isValidBrowser() ? (
      <div className={`app ${pathname.replace("/", "page-")}`}>
        <Header {...this.props} />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            timeout={500}
            classNames="page-transition"
          >
            <Switch location={this.props.location}>
              <Route
                exact
                key="/"
                path="/"
                render={() => {
                  // render={props => {
                  return <Home {...this.props} />;
                  // return <Home page={page} {...this.props} {...props} />;
                }}
              />

              <Route
                exact
                key="/about"
                path="/about"
                render={() => {
                  // render={props => {
                  return <About />;
                  // return <Home page={page} {...this.props} {...props} />;
                }}
              />

              <Route
                path="/"
                key="redirectAllElse"
                render={() => {
                  return <Redirect to="/" />;
                }}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    ) : (
      <InvalidBrowser />
    );
  }
}

// export default appContextProvider(App);
