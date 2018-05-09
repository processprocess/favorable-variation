const appContextProvider = (Component) => class AppContextProvider extends React.Component {

  static propTypes = {
    content: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
  }

  static childContextTypes = {
    content: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
  }

  getChildContext = () => ({
    history: this.props.history,
    location: this.props.location,
    content: {
      all: this.all(),
      forCurrentPage: this.forCurrentPage(),
      byId: this.byId,
      byPath: this.byPath,
      byTemplate: this.byTemplate,
      childrenById: this.childrenById,
      childrenByPath: this.childrenByPath,
      parentById: this.parentById,
      parentByPath: this.parentByPath,
    }
  })

  constructor(props) {
    super(props)
    this.content = this.props.content;
    this.history = this.props.history;
  }

  all = () => this.content

  forCurrentPage = () => {
    return this.byPath(this.props.location.pathname)
  }

  byId = (id) => this.content[id] || {}

  byPath = (path) => {
    path = path.toLowerCase();
    path = path.slice(-1) === '/' && path.length > 1 ? path.slice(0, -1) : path;
    const id = Object.keys(this.content).find(key =>  this.content[key].path === path);
    return this.content[id] || {};
  }

  byTemplate = (template) => {
    return Object.keys(this.content)
      .filter(key => this.content[key].template === template)
      .map(key => this.content[key])
      .sort((a, b) => a.sortorder - b.sortorder);
  }

  childrenById = (id) => {
    return Object.keys(this.content)
      .filter(key => this.content[key].parentid === id)
      .map(key => this.content[key])
      .sort((a, b) => a.sortorder - b.sortorder);
  }

  childrenByPath = (path) => {
    const id = this.byPath(path, store).id;
    return this.childrenById(id, store);
  }

  parentById = (id) => {
    const ID = this.byId(id, store).parentid;
    return this.byId(ID, store);
  }

  parentByPath = (path) => {
    const ID = this.byPath(path, store).parentid;
    return this.byId(ID, store);
  }

  render() {
    return <Component { ...this.props }/>
  }

}

/*----------------------------------------------------------------------------*\
 EXPORT
\*----------------------------------------------------------------------------*/

export default appContextProvider;
