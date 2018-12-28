const dom = (element, attrs, ...children) => ({ element, attrs, children })

// import Logo from '../logo'

const websites = ['foo', 'bar', 'baz', 'quex']

const Headline = () => (
  <div>
    <h2 className="css">Title</h2>
    {/* <Logo color="#34ff90" /> */}
    <p>
      Lorem <br /> Ipsum
    </p>
    <hr />
    <img
      src="https://www.cocacola.es/content/dam/GO/CokeZone/Common/global/logo/logodesktop/coca-cola-logo-260x260.png"
      width="150"
      height="150"
    />
    <ul>
      {websites.map(web => (
        <li>
          <a href="http://google.com">{web}</a>
        </li>
      ))}
    </ul>
  </div>
)

export default Headline
