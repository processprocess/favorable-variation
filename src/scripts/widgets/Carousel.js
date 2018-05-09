import Slick from "react-slick";
import Image from "widgets/Image";

class Carousel extends React.Component {
  static propTypes = {
    slides: PropTypes.array,
    settings: PropTypes.object,
    className: PropTypes.string,
    keyboardControl: PropTypes.bool,
  };

  imageComponentFor(slide) {
    const imgProps = {
      align: slide.image1_anchor,
      src: slide.image1,
      alt: slide.image1_alt_text
    };
    return <Image {...imgProps} />;
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", this.handleKeyDown);
    }
  }

  handleKeyDown = e => {
    if (this.props.keyboardControl && this.slick) {
      if (
        !document.activeElement ||
        document.activeElement.tagName !== "INPUT"
      ) {
        if (e.key === "ArrowLeft" || e.key === "Left") {
          this.slick.slickPrev();
        } else if (e.key === "ArrowRight" || e.key === "Right") {
          this.slick.slickNext();
        }
      }
    }
  };

  render() {
    const { slides, className } = this.props;
    if (!slides || !slides.length) {
      return null;
    }

    if (slides.length === 1) {
      return (
        <div
          className={`carousel-with-one-image ${className}`}
          style={{ padding: 0 }}
        >
          {this.imageComponentFor(slides[0])}
        </div>
      );
    }

    return (
      <div className={`carousel ${className}`}>
        <Slick ref={r => (this.slick = r)} {...this.props.settings}>
          {slides.map((slide, i) => {
            return (
              <div key={i}>
                {this.imageComponentFor(slide)}
                {slide.blurb1 && (
                  <div className="image-caption">{slide.blurb1}</div>
                )}
              </div>
            );
          })}
        </Slick>
      </div>
    );
  }
}

export default Carousel;
