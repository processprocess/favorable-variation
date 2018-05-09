export default class Home extends React.Component {
  static propTypes = {
    content: PropTypes.array
  };
  //
  constructor(props, context) {
    super(props, context);
    const { content } = props;
    this.posts = content
      .filter(item => item.fields.itemType === "post")
      .sort((a, b) => a.fields.id > b.fields.id)
      .map(item => item.fields);
  }

  renderListPosts = () => {
    const { posts } = this;
    return posts.map((post, i) => {
      return (
        <div key={`post ${i}`}>
          {/* <div className="post-title">{post.title}</div>
          <div className="post-blurb">{post.blurb}</div> */}
          <div className="post-image-wrapper">
            <div
              className="post-image"
              style={{
                backgroundImage: `url(https:${post.image.fields.file.url})`
              }}
            />
          </div>
        </div>
      );
    });
  };

  render() {
    return <div className="home-wrapper">{this.renderListPosts()}</div>;
  }
}
