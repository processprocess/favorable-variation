/******************************************************************************\
 DEPENDENCIES
\******************************************************************************/

import { Link as RRLink } from 'react-router-dom';

/******************************************************************************\
 CONFIG: COMPONENT DECLARATION, PROPTYPES, DEFAULT PROPS, & COMPONENT STATE
\******************************************************************************/

class Link extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    hash: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    onClick: PropTypes.func,
    path: PropTypes.string,
    query: PropTypes.string,
    state: PropTypes.object,
    style: PropTypes.object,
    title: PropTypes.string
  };

  static contextTypes = { content: PropTypes.object }

/******************************************************************************\
 COMPONENT METHODS
\******************************************************************************/

  formatURL(path) {
    const props = { url: null, target: null };
    if (path) {
      if (this.isEmail(path)) {
        props.url = path;
      } else if (this.isExternal(path)) {
        props.url = path;
        props.target = '_blank';
      } else if (this.isFile(path)) {
        props.url =  path;
        props.target = '_blank';
      } else if (this.isPhone(path)) {
        props.url = `tel:${ path.replace(/\D/g, '') }`;
      }
    }
    return props;
  }

  getContent(id, path) {
    const { content } = this.context
    if (typeof id === 'number') {
      return content.byID(id);
    } else if (path) {
      return content.byPath(path);
    } else {
      return {};
    }
  }

  getDomain(url) { return url.replace(/https?:\/\//, '').split('/')[0]; }

  isEmail(url) { return url.search(/mailto:/) !== -1; }

  isExternal(path) {
    const { href } = window.location;
    const sameDomain = this.getDomain(href) === this.getDomain(path);
    return path.search(/https?:\/\//) !== -1 && !sameDomain;
  }

  isFile(url) { return url.search(/\.pdf/) !== -1; }

  isPhone(url) { return url.search(/tel:/) !== -1; }

/******************************************************************************\
 COMPONENT VIEW
\******************************************************************************/

  render() {

    const {
      children,
      hash,
      id,
      path,
      title,
      className,
      onClick
    } = this.props;

    const content = this.getContent(id, path);
    let link;
    let search;
    if (content.linkswitch) {
      const qMarkIndex = content.link.indexOf('?');
      if (qMarkIndex === -1) {
        search = ''
        link = this.getContent(null, content.link);
      } else {
        search = content.link.slice(qMarkIndex)
        link = this.getContent(null, content.link.slice(0, qMarkIndex));
      }
    } else {
      search = ''
      link = content;
    }
    const { url, target } = this.formatURL(content.linkswitch ? content.link : path);

    return link.path ? (
      <RRLink
        className={className}
        onClick={onClick}
        to={{
          pathname: link.path,
          search: search,
        }}>
        { children || title || link.linktitle || path }
      </RRLink>
    ) : url ? (
      <a
        className={className}
        onClick={onClick}
        href={ `${ url }${ hash ? `#${ hash }` : '' }` }
        target={ target }>
        { children || title || path }
      </a>
    ) : ( 
      <span
        className={className} onClick={onClick}>
        { children || title || path }
      </span>
    );
  }
}

/******************************************************************************\
 EXPORT
\******************************************************************************/

export default Link;