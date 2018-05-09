import Marker from './Marker.js';
import mapStyles from './mapStyles'

class Map extends React.Component {

  static propTypes = {
    center: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    disableDefaultUI: PropTypes.bool,
    draggable: PropTypes.bool,
    fullscreenControl: PropTypes.bool,
    height: PropTypes.string,
    id: PropTypes.string,
    keyboardShortcuts: PropTypes.bool,
    mapTypeControl: PropTypes.bool,
    panControl: PropTypes.bool,
    scaleControl: PropTypes.bool,
    scrollwheel: PropTypes.bool,
    selectedMarkerID: PropTypes.number,
    streetViewControl: PropTypes.bool,
    styles: PropTypes.array,
    width: PropTypes.string,
    zoom: PropTypes.number,
    zoomControl: PropTypes.bool,
  };

  static defaultProps = {
    center: { lat: 25.853591, lng: -80.119976 },
    className: '',
    disableDefaultUI: true,
    draggable: true,
    fullscreenControl: false,
    keyboardShortcuts: true,
    mapTypeControl: false,
    height: '100%',
    id: 'map',
    panControl: true,
    scaleControl: true,
    scrollwheel: true,
    streetViewControl: false,
    styles: mapStyles,
    width: '100%',
    zoom: 4,
    zoomControl: true,
  };

  state = {
    apiURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA-AHeYR7ECDqhaFASSBTk42OFGQVCErD4',
    map: null,
    markers: null
  };

  componentDidMount() {
    window.google && window.google.maps ? this.initMap() : this.loadScript();
  }

  componentWillReceiveProps(nextProps) {
    const { markers } = this.state;
    markers &&
      markers.forEach(marker => {
        if (marker === this.nyloMarker) {
          marker.setOpacity(1.0);
        } else if (marker.ID === nextProps.selectedMarkerID) {
          marker.setOpacity(1.0);
          this.state.map.panTo(marker.getPosition());
        } else {
          marker.setOpacity(0.6);
        }
      });
  }

  addMarkers() {
    const { children } = this.props;
    const { map } = this.state;

    const markers = React.Children.map(children, child => {
        const {
          icon,
          position,
          title,
          opacity,
          ID
        } = child.props;

        const marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          icon,
          map,
          position,
          title,
          opacity,
          ID,
          clickable: false
        });

      if (marker.ID === "nyloMarker") {
        this.nyloMarker = marker;
      }

      return marker;
    });
    this.setState({ markers });
  }

  loadScript() {
    const { apiURL } = this.state;
    const script = document.createElement('script');
    script.src = apiURL;
    script.type = 'text/javascript';
    script.onload = ::this.initMap;
    document.querySelector('body').appendChild(script);
  }

  initMap() {
    const container = this.mapRef;
    const {
      id,
      center,
      disableDefaultUI,
      draggable,
      fullscreenControl,
      keyboardShortcuts,
      mapTypeControl,
      panControl,
      scaleControl,
      scrollwheel,
      streetViewControl,
      styles,
      zoom,
      zoomControl
    } = this.props;

    const map = new google.maps.Map(container, {
      id,
      center,
      disableDefaultUI,
      draggable,
      fullscreenControl,
      keyboardShortcuts,
      mapTypeControl,
      panControl,
      scaleControl,
      scrollwheel,
      streetViewControl,
      styles,
      zoom,
      zoomControl
    });

    this.setState({ map }, () => { this.addMarkers() });
  }

  render() {
    const {
      className,
      height,
      id,
      width
    } = this.props;

    return (
      <div
        className={`map ${ className }`}
        id={ id }
        ref={ e => this.mapRef = e}
        style={{ height, width }} />
    );
  }
}

export { Map, Marker };
