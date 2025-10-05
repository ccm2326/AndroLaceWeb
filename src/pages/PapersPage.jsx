import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, BookOpen, TrendingUp, Download } from 'lucide-react';
import './PapersPage.css';

const PapersPage = () => {
  const [papers, setPapers] = useState([
    {
      id_paper: 1,
      title: "Climate Change Impact on Arctic Ecosystems: A Comprehensive Analysis",
      abstract: "This study examines the profound effects of climate change on Arctic ecosystems, focusing on biodiversity shifts, ice melting patterns, and ecosystem resilience. Our findings reveal significant changes in species distribution and ecosystem dynamics over the past two decades.",
      year: 2023,
      journal: "Nature Climate Change",
      doi: "10.1038/s41558-023-01567-8",
      citations_count: 127,
      authors: [{ first_name: "Sarah", last_name: "Johnson" }]
    },
    {
      id_paper: 2,
      title: "Machine Learning Applications in Space Exploration: Autonomous Navigation Systems",
      abstract: "This paper presents novel machine learning algorithms for autonomous spacecraft navigation. We demonstrate how deep reinforcement learning can improve mission success rates and reduce human intervention requirements in deep space missions.",
      year: 2023,
      journal: "Journal of Space Technology",
      doi: "10.1016/j.jst.2023.04.012",
      citations_count: 89,
      authors: [{ first_name: "Michael", last_name: "Chen" }]
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    journal: ''
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="papers-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">Scientific Papers</h1>
        <p className="page-subtitle">
          Explore our collection of scientific research papers
        </p>
      </motion.div>

      <motion.div
        className="search-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search papers by title, abstract, author..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <label className="filter-label">Year</label>
            <select
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="filter-select"
            >
              <option value="">All years</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Journal</label>
            <select
              value={filters.journal}
              onChange={(e) => handleFilterChange('journal', e.target.value)}
              className="filter-select"
            >
              <option value="">All journals</option>
              <option value="Nature">Nature</option>
              <option value="Science">Science</option>
              <option value="Cell">Cell</option>
              <option value="Physical Review">Physical Review</option>
            </select>
          </div>
        </div>
      </motion.div>

      <div className="results-info">
        <p>
          Showing {papers.length} papers
        </p>
      </div>

      <div className="papers-grid">
        {papers.map((paper, index) => (
          <motion.div
            key={paper.id_paper}
            className="paper-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="paper-metadata">
              <div className="metadata-pill">
                <Calendar size={14} />
                <span>{paper.year}</span>
              </div>
              <div className="metadata-pill">
                <BookOpen size={14} />
                <span>{paper.journal}</span>
              </div>
              <div className="metadata-pill">
                <TrendingUp size={14} />
                <span>{paper.citations_count} citations</span>
              </div>
            </div>

            <h3 className="paper-title">
              <Link to={`/papers/${paper.id_paper}`}>
                "{paper.title}"
              </Link>
            </h3>

            <p className="paper-author">
              Lead Author, Dr. {paper.authors?.[0]?.first_name} {paper.authors?.[0]?.last_name} ({paper.year})
            </p>

            <div className="paper-abstract">
              <p>
                {truncateText(paper.abstract, 300)}
              </p>
            </div>

            <div className="paper-bottom">
              <a 
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-paper-btn"
              >
                <Download size={16} />
                <span>VIEW PAPER</span>
              </a>
              <div className="paper-doi">
                {paper.doi}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PapersPage;
