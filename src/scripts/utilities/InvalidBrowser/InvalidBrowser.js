
import chrome from './../../../images/chrome.jpg';
import ie from './../../../images/ie.jpg';
import {
  invalidBrowser,
  invalidBrowserContent,
  invalidBrowserImages,
  invalidBrowserInner,
  invalidBrowserText
} from './InvalidBrowser.scss';


const InvalidBrowser = () => (
  <div className={invalidBrowser}>
    <div className={invalidBrowserInner}>
      <div className={invalidBrowserContent}>
        <div className={invalidBrowserImages}>
          <img src={ie} />
          <img src={chrome} />
        </div>
        <div className={invalidBrowserText}>
          <p>
            {`This website no longer supports Internet Explorer 10 or below. Please `}
            <a
              href="http://windows.microsoft.com/en-us/internet-explorer/download-ie"
              target="_blank">
              {`upgrade to the latest version of Internet Explorer`}
            </a>
            {` or visit using `}
            <a
              href="https://www.google.com/chrome/browser/desktop/"
              target="_blank">
              {`another web browser.`}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default InvalidBrowser;
