export default class Home extends React.Component {
  static propTypes = {
    content: PropTypes.array
  };

  constructor(props, context) {
    super(props, context);
    const { content } = props;
    this.posts = content
      .filter(item => item.fields.itemType === "post")
      .sort((a, b) => a.fields.id > b.fields.id)
      .map(item => item.fields);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // animateText = animateIn => {
  //   const text = this.shuffle(
  //     Array.from(this.introText.querySelectorAll("span"))
  //   );
  //
  //   text.forEach((char, i) => {
  //     animateIn
  //       ? setTimeout(() => {
  //           char.classList.remove("scrolled");
  //         }, 10 * i)
  //       : setTimeout(() => {
  //           char.classList.add("scrolled");
  //         }, 10 * i);
  //   });
  // };

  // shuffle(a) {
  //   var j, x, i;
  //   for (i = a.length - 1; i > 0; i--) {
  //     j = Math.floor(Math.random() * (i + 1));
  //     x = a[i];
  //     a[i] = a[j];
  //     a[j] = x;
  //   }
  //   return a;
  // }

  handleScroll = () => {
    if (window.scrollY > 1) {
      // this.animateText(false);
      this.introText.classList.add("scrolled");
    } else {
      // this.animateText(true);
      this.introText.classList.remove("scrolled");
    }
  };

  renderHero = () => {
    const { posts } = this;
    const randomPost = posts[0];
    // const randomPost = posts[Math.floor(Math.random() * posts.length)];
    return (
      <div className="post hero">
        <div ref={r => (this.introText = r)} className="intro-text">
          Favorable Variation
          {/* {"Favorable Variation".split("").map(char => <span>{char}</span>)} */}
        </div>
        <div className="post-image-wrapper">
          <div
            className="post-image"
            style={{
              backgroundImage: `url(https:${randomPost.image.fields.file.url})`
            }}
          />
        </div>
      </div>
    );
  };

  renderListPosts = () => {
    const { posts } = this;
    return posts.map((post, i) => {
      return (
        <div className="post" key={`post ${i}`}>
          {/* <div className="description-inner">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-blurb">{post.blurb}</p>
          </div> */}
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
    return (
      <div className="home-wrapper">
        {this.renderHero()}
        {this.renderListPosts()}
      </div>
    );
  }
}
