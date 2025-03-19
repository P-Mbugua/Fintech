import React from 'react'
import Header from '../components/Common/Header'

import Footer from '../components/Common/Footer'
import Contact from '../components/Common/Contact'

function DashboardLayout({ children }) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    );
  }


export default DashboardLayout



