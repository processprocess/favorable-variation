import { Link } from "react-router-dom";

import zenScroll from "zenscroll";

export default class Header extends React.Component {
  static propTypes = {
    location: PropTypes.object
  };

  constructor(props) {
    super();
    console.log(props.location);
  }

  scrollToTop() {
    zenScroll.toY(0, 500);
  }

  render() {
    const { pathname } = this.props.location;
    return (
      <header>
        <h2 className="fixed top left">Philip Hunter Bell</h2>
        <h2 className="fixed bottom left">© {new Date().getFullYear()}</h2>
        <h2 onClick={this.scrollToTop} className="button fixed bottom right">
          Top
        </h2>
        <div className="fixed nav top">
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
