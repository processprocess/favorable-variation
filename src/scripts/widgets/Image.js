/******************************************************************************\
 CONFIG: COMPONENT DECLARATION, PROPTYPES, DEFAULT PROPS, & COMPONENT STATE
\******************************************************************************/

class Image extends React.Component {

  static propTypes = {
    align: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, '1', '2', '3', '4', '5', '6', '7', '8', '9']).isRequired,
    alt: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string.isRequired,
    fixedAspectRatio: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['background', 'element']).isRequired
  };

  static defaultProps = {
    align: 5,
    className: '',
    fixedAspectRatio: true,
    type: 'background'
  };


/******************************************************************************\
 COMPONENT VIEW
\******************************************************************************/

  render() {

    const {
      align,
      alt,
      children,
      className,
      src,
      type
    } = this.props;

    return type === 'background' ? (
      <div
        className={ `image image--${ type } image--aligned-${ align } ${ className }` }
        style={{
          backgroundImage: `url('${ src }')`
        }}>
          { children && (
            <div className="image__inner">{ children }</div>
          ) }
        </div>
    ) : (
      <img
        alt={ alt }
        className={ `image image--${ type } ${ className }` }
        src={ src } />
    )
  }
}

/******************************************************************************\
 EXPORT
\******************************************************************************/

export default Image;
