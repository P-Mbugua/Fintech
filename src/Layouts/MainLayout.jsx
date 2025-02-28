import React from "react";

function MainLayout({ children }) {
  return (
    <div>
      <header>Navbar</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}

export default MainLayout;
