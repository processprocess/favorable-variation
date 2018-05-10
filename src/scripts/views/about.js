export default class About extends React.Component {
  render() {
    return (
      <div className="about-wrapper">
        <div className="about-copy">
          <h1 className="statement">
            Fusce consequat nibh id gravida congue. Proin sem erat, commodo vel
            rutrum quis, convallis eu justo. Aenean pulvinar ex vitae elementum
            vulputate. Cras volutpat sit amet nisi eu convallis. Maecenas a mi a
            turpis dictum consectetur eu eu arcu. Aliquam faucibus, massa quis
            mattis efficitur, orci ligula hendrerit ante, in tempus elit elit in
            urna. Donec vehicula ornare odio. Mauris tincidunt dolor dui, sit
            amet fringilla ex semper ac.
          </h1>
          <div className="colophon">
            Colophon: Website design and programming by Philip Bell. The text of
            this website is set in Helvetica Neue. It is programmed with the
            React.js framework, bundled with webpack on a 2013 IMac.
          </div>
        </div>
      </div>
    );
  }
}
