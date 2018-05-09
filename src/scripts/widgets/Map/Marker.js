class Marker extends React.Component {

  static propTypes = {
    content: PropTypes.string,
    contentMaxWidth: PropTypes.number.isRequired,
    icon: PropTypes.string,
    opacity: PropTypes.any,
    ID: PropTypes.any,
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired,
    title: PropTypes.string,
    open: PropTypes.bool,
  };

  static defaultProps = { contentMaxWidth: 200 };

  render() { return null; }
}

export default Marker;