import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, BookOpen, TrendingUp, Download, User, Tag, FileText, Quote, MessageCircle } from 'lucide-react';
import PaperChatWidget from '../components/PaperChatWidget';
import './PaperDetailPage.css';

const PaperDetailPage = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Mock data - in a real app, this would come from an API
  const mockPapers = [
    {
      id_paper: 1,
      title: "Climate Change Impact on Arctic Ecosystems: A Comprehensive Analysis",
      abstract: "This study examines the profound effects of climate change on Arctic ecosystems, focusing on biodiversity shifts, ice melting patterns, and ecosystem resilience. Our findings reveal significant changes in species distribution and ecosystem dynamics over the past two decades. The research demonstrates that rising temperatures have led to unprecedented ice loss, affecting polar bear populations, marine life, and indigenous communities. We present comprehensive data from satellite imagery, field studies, and climate models to support our conclusions about the accelerating pace of environmental change in the Arctic region.",
      year: 2023,
      journal: "Nature Climate Change",
      doi: "10.1038/s41558-023-01567-8",
      citations_count: 127,
      authors: [
        { first_name: "Sarah", last_name: "Johnson", affiliation: "University of Alaska" },
        { first_name: "Michael", last_name: "Chen", affiliation: "MIT Climate Lab" },
        { first_name: "Elena", last_name: "Rodriguez", affiliation: "Arctic Research Institute" }
      ],
      keywords: ["Climate Change", "Arctic", "Ecosystems", "Biodiversity", "Environmental Science"],
      themes: ["Climate Science", "Environmental Research"],
      content: {
        introduction: "The Arctic region has experienced unprecedented environmental changes over the past two decades, with temperatures rising at twice the global average rate. This comprehensive study examines the multifaceted impacts of climate change on Arctic ecosystems, providing critical insights into the future of this fragile environment.",
        methodology: "Our research combines satellite data analysis, field observations, and climate modeling to assess ecosystem changes. We analyzed data from 2000-2023, covering 15 Arctic regions and monitoring 200+ species.",
        results: "Key findings include a 40% reduction in sea ice coverage, significant shifts in species distribution patterns, and increased vulnerability of indigenous communities. Polar bear populations have decreased by 25% in monitored regions.",
        conclusion: "The Arctic ecosystem is undergoing rapid transformation due to climate change. Immediate action is required to mitigate further damage and protect vulnerable species and communities."
      }
    },
    {
      id_paper: 2,
      title: "Machine Learning Applications in Space Exploration: Autonomous Navigation Systems",
      abstract: "This paper presents novel machine learning algorithms for autonomous spacecraft navigation. We demonstrate how deep reinforcement learning can improve mission success rates and reduce human intervention requirements in deep space missions. Our approach combines computer vision, sensor fusion, and predictive modeling to enable spacecraft to navigate complex environments autonomously. The system has been tested in simulated Mars landing scenarios and shows promising results for future interplanetary missions.",
      year: 2023,
      journal: "Journal of Space Technology",
      doi: "10.1016/j.jst.2023.04.012",
      citations_count: 89,
      authors: [
        { first_name: "Michael", last_name: "Chen", affiliation: "NASA Jet Propulsion Laboratory" },
        { first_name: "Dr. Sarah", last_name: "Williams", affiliation: "SpaceX Advanced Systems" },
        { first_name: "Prof. James", last_name: "Anderson", affiliation: "MIT Aerospace Engineering" }
      ],
      keywords: ["Machine Learning", "Space Exploration", "Autonomous Navigation", "Deep Learning", "Aerospace"],
      themes: ["Space Technology", "Artificial Intelligence"],
      content: {
        introduction: "Autonomous navigation is crucial for the future of space exploration, enabling spacecraft to operate independently in challenging environments where communication delays make real-time control impossible.",
        methodology: "We developed a deep reinforcement learning framework that processes multi-modal sensor data including cameras, LIDAR, and inertial measurement units. The system uses a combination of convolutional neural networks and recurrent neural networks.",
        results: "Our autonomous navigation system achieved 95% success rate in simulated Mars landing scenarios, compared to 78% for traditional methods. The system reduced mission planning time by 60%.",
        conclusion: "Machine learning-based autonomous navigation represents a significant advancement in space exploration technology, enabling more ambitious missions with reduced human intervention."
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundPaper = mockPapers.find(p => p.id_paper === parseInt(id));
      setPaper(foundPaper);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="paper-detail-page">
        <div className="paper-layout">
          <div className="paper-content-column">
            <div className="loading-container">
              <div className="loading-spinner">
                <FileText size={48} />
              </div>
              <p>Loading paper details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="paper-detail-page">
        <div className="error-container">
          <h2>Paper Not Found</h2>
          <p>The requested paper could not be found.</p>
          <Link to="/papers" className="back-button">
            <ArrowLeft size={20} />
            Back to Papers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-detail-page">
      <div className={`paper-layout ${isChatOpen ? 'chat-open' : ''}`}>
        {/* Left Column - Paper Content */}
        <motion.div
          className="paper-content-column"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="paper-header">
            <Link to="/papers" className="back-button">
              <ArrowLeft size={20} />
              Back to Papers
            </Link>
            
            <button 
              className="chat-toggle-btn"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageCircle size={20} />
            </button>
          </div>
          
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

          {/* Title */}
          <h1 className="paper-title">"{paper.title}"</h1>

          {/* Authors */}
          <div className="paper-authors">
            <h3 className="authors-title">
              <User size={20} />
              Authors
            </h3>
            <div className="authors-list">
              {paper.authors.map((author, index) => (
                <div key={index} className="author-item">
                  <span className="author-name">
                    {author.first_name} {author.last_name}
                  </span>
                  <span className="author-affiliation">{author.affiliation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Abstract */}
          <div className="paper-section">
            <h3 className="section-title">
              <Quote size={20} />
              Abstract
            </h3>
            <p className="abstract-text">{paper.abstract}</p>
          </div>

          {/* Keywords */}
          <div className="paper-section">
            <h3 className="section-title">
              <Tag size={20} />
              Keywords
            </h3>
            <div className="keywords-list">
              {paper.keywords.map((keyword, index) => (
                <span key={index} className="keyword-tag">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Themes */}
          <div className="paper-section">
            <h3 className="section-title">
              <FileText size={20} />
              Research Themes
            </h3>
            <div className="themes-list">
              {paper.themes.map((theme, index) => (
                <span key={index} className="theme-tag">
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="paper-content">
            <h3 className="section-title">Paper Content</h3>
            
            <div className="content-section">
              <h4>Introduction</h4>
              <p>{paper.content.introduction}</p>
            </div>

            <div className="content-section">
              <h4>Methodology</h4>
              <p>{paper.content.methodology}</p>
            </div>

            <div className="content-section">
              <h4>Results</h4>
              <p>{paper.content.results}</p>
            </div>

            <div className="content-section">
              <h4>Conclusion</h4>
              <p>{paper.content.conclusion}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="paper-actions">
            <a 
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="view-paper-btn"
            >
              <Download size={16} />
              <span>VIEW FULL PAPER</span>
            </a>
            <div className="paper-doi">
              DOI: {paper.doi}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Chat */}
        {isChatOpen && (
          <motion.div
            className="chat-column"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
                <PaperChatWidget
                  paperTitle={paper.title}
                  paperId={paper.id_paper}
                  isEmbedded={true}
                  onClose={() => setIsChatOpen(false)}
                />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaperDetailPage;
