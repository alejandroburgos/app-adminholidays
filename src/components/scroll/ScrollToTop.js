import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ navigate, children }) {
  useEffect(() => {
      if (!window.location.href.includes('/templates')) {

          const unlisten = navigate.listen(() => {
            window.scrollTo(0, 0);
          });
          return () => {
            unlisten();
          }
      }
  });


  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);