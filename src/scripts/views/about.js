export default class About extends React.Component {
  static propTypes = {
    content: PropTypes.array
  };

  constructor(props, context) {
    super(props, context);
    const { content } = props;
    this.posts = content
      .filter(item => item.fields.statement)
      .map(item => item.fields);
  }

  render() {
    const { posts } = this;
    return (
      <div className="about-wrapper">
        <div className="about-copy">
          <h1
            className="statement"
            dangerouslySetInnerHTML={{ __html: posts[0].statement }}
          />
          <div
            className="colophon"
            dangerouslySetInnerHTML={{ __html: posts[0].colophon }}
          />
        </div>
      </div>
    );
  }
}
