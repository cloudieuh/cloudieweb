import React from 'react'
// import InstagramFeed from './InstagramFeed'
import './Footer.css'

export default () => (
  <div>
    {/* <h4 className="taCenter">
      For inquiries regarding this project. 
      Please contact dorome [at_mark] is.naist.jp
    </h4> */}
    <br />
    {/* <InstagramFeed count="8" /> */}
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. {' '}
          <a href='/'>Ubicon Lab UNHAS</a>.
        </span>
      </div>
    </footer>
  </div>
)
