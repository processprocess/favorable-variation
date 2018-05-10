import { Link } from "react-router-dom";

import zenScroll from "zenscroll";

export default class Header extends React.Component {
  static propTypes = {
    location: PropTypes.object
  };

  state = {
    idle: false
  };

  // componentDidMount() {
  //   this.startTimeout();
  //   window.addEventListener("scroll", e => {
  //     console.log("timestarted");
  //     if (!this.state.idle) {
  //       this.setState({ idle: true });
  //     }
  //     if (this.state.idle) {
  //       clearTimeout(this.timeout);
  //       this.setState({ idle: false });
  //     }
  //   });
  // }
  //
  // startTimeout = () => {
  //   this.timeout = window.setTimeout(() => {
  //     console.log("timeout");
  //     this.setState({ idle: true });
  //   }, 1000);
  // };

  scrollDown() {
    zenScroll.toY(window.scrollY + window.innerHeight, 500);
  }

  scrollToTop() {
    zenScroll.toY(0, 500);
  }

  render() {
    const { pathname } = this.props.location;
    const { idle } = this.state;
    console.log(idle);
    return (
      <header className={idle ? "idle" : ""}>
        <h2 className="fixed top left">Philip Hunter Bell</h2>
        <h2 className="fixed bottom left">© {new Date().getFullYear()}</h2>
        <h2
          onClick={this.scrollDown}
          className="scroll-to-next arrow button fixed bottom bump-left"
        >
          ↓
        </h2>
        <h2
          onClick={this.scrollToTop}
          className="scroll-to-top button fixed bottom right"
        >
          Top
        </h2>
        <div className="fixed nav top bump-left">
          <h2 className={`button ${pathname === "/" ? "active" : ""}`}>
            <Link to="/">Works</Link>
          </h2>
          <h2 className={`button ${pathname === "/about" ? "active" : ""}`}>
            <Link to="/about">About</Link>
          </h2>
        </div>
      </header>
    );
  }
}
