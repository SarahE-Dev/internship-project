'use client'
import {useState} from 'react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold text-purple-600">
                Brand
              </a>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <a href="/" className="text-gray-800 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
                <a href="/articles" className="text-gray-800 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                  Articles
                </a>
                <a href="/create" className="text-gray-800 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                  Create Article
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center -mr-2 md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="text-gray-800 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            <a href="/articles" className="text-gray-800 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
              Article
            </a>
            <a href="/create" className="text-gray-800 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
              Create Article
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
