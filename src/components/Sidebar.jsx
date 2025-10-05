import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, description: 'Overview and statistics' },
    { name: 'Papers', href: '/papers', icon: FileText, description: 'Explore scientific papers' }
  ];

  return (
    <motion.aside 
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -280 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sidebar-content">
        <div className="sidebar-header">
          <button 
            className="sidebar-toggle-btn"
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title">Navigation</h3>
          <nav className="sidebar-nav">
            {navigation.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`sidebar-link ${location.pathname === item.href ? 'active' : ''}`}
                  >
                    <IconComponent size={20} className="sidebar-icon" />
                    {isOpen && (
                      <div className="sidebar-link-content">
                        <span className="sidebar-link-text">{item.name}</span>
                        <span className="sidebar-link-desc">{item.description}</span>
                      </div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
