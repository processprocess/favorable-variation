class Hamburger extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool
  };

  static defaultProps = {
    isOpen: false
  };

  render() {
    return (
      <div className={`hamburger${this.props.isOpen ? " open" : ""}`}>
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }
}

export default Hamburger;
