import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, Users, Tag, TrendingUp, Search, MessageCircle, BarChart3 } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const [stats, setStats] = useState({
    totalPapers: 89,
    totalAuthors: 127,
    totalKeywords: 45,
    averageCitations: 156
  });
  const [chartData, setChartData] = useState({
    papersByYear: [
      { year: 2020, count: 45 },
      { year: 2021, count: 52 },
      { year: 2022, count: 67 },
      { year: 2023, count: 89 }
    ],
    papersByTheme: [
      { theme: "Climate Science", count: 23 },
      { theme: "Space Technology", count: 18 },
      { theme: "Quantum Physics", count: 15 },
      { theme: "Energy Storage", count: 21 },
      { theme: "Biomedical Research", count: 12 }
    ],
    citationsTrend: [
      { month: "Jan", citations: 120 },
      { month: "Feb", citations: 135 },
      { month: "Mar", citations: 148 },
      { month: "Apr", citations: 162 },
      { month: "May", citations: 175 },
      { month: "Jun", citations: 189 }
    ]
  });
  const [loading, setLoading] = useState(false);

  const COLORS = ['#3b82f6', '#1e3a8a', '#6366f1', '#059669', '#dc2626'];

  return (
    <div className="home-page">
      <motion.div
        className="welcome-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="welcome-title">
          Welcome to <span className="highlight">AndroLace Insight</span>
        </h1>
        <p className="welcome-subtitle">
          Your scientific knowledge platform to explore research papers, 
          interact with our intelligent assistant and discover valuable insights.
        </p>
      </motion.div>

      <motion.div
        className="stats-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="stat-card">
          <div className="stat-icon">
            <FileText size={32} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalPapers}</h3>
            <p className="stat-label">Total Papers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={32} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalAuthors}</h3>
            <p className="stat-label">Authors</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Tag size={32} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalKeywords}</h3>
            <p className="stat-label">Keywords</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={32} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.averageCitations}</h3>
            <p className="stat-label">Average Citations</p>
          </div>
        </div>
      </motion.div>

      <div className="charts-section">
        <motion.div
          className="chart-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="chart-title">Papers by Year</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.papersByYear}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--white)', 
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--border-radius)'
                }} 
              />
              <Bar dataKey="count" fill="var(--primary-blue)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="chart-title">Distribution by Topics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.papersByTheme}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {chartData.papersByTheme.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-container full-width"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="chart-title">Citations Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.citationsTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--white)', 
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--border-radius)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="citations" 
                stroke="var(--primary-blue)" 
                strokeWidth={3}
                dot={{ fill: 'var(--primary-blue)', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
