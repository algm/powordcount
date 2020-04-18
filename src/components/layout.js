import PropTypes from "prop-types";
import React from "react";


function Layout({ children }) {
  return (
    <div className="w-screen h-screen flex flex-row min-h-screen font-sans text-gray-900 content-stretch items-center">
      <main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 items-center content-center">
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
