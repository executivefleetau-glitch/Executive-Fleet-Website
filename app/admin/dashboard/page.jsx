"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, CalendarCheck, Clock, CheckCircle, Mail, Users } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/dashboard-stats', {
        cache: 'no-store', // Ensure fresh data
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timeValue) => {
    if (!timeValue) return 'N/A';
    try {
      const date = new Date(timeValue);
      return date.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true });
    } catch {
      return 'N/A';
    }
  };

  // Multicolor scheme for charts
  const COLORS = {
    primary: '#ce9b28',
    secondary: '#E8B429',
    chartColors: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'],
    vehicleColors: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'],
    statusColors: {
      pending: '#f59e0b',
      confirmed: '#10b981', 
      cancelled: '#ef4444',
      completed: '#3b82f6'
    }
  };

  const statusCards = [
    {
      title: "Today's Bookings",
      value: stats?.todayBookings || 0,
      icon: Calendar,
      iconColor: "#ce9b28",
    },
    
    {
      title: "Pending Quotes",
      value: stats?.pendingQuotes || 0,
      icon: Clock,
      iconColor: "#ce9b28",
    },
    {
      title: "Confirmed Bookings",
      value: stats?.confirmedBookings || 0,
      icon: CheckCircle,
      iconColor: "#ce9b28",
    },
    
    {
      title: "Website Visits",
      value: stats?.websiteVisits || 0,
      icon: Users,
      iconColor: "#ce9b28",
    },
  ];

  if (loading || !stats) {
    return (
      <DashboardLayout>
        <div className="loading-container">
          <div className="spinner-wrapper">
            <div className="spinner"></div>
            <div className="spinner-glow"></div>
          </div>
          <p className="loading-text">Loading dashboard data...</p>
          <p className="loading-subtext">This may take a moment</p>
        </div>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 70vh;
            background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
          }
          .spinner-wrapper {
            position: relative;
            width: 80px;
            height: 80px;
            margin-bottom: 24px;
          }
          .spinner {
            width: 80px;
            height: 80px;
            border: 5px solid rgba(206, 155, 40, 0.15);
            border-top: 5px solid #ce9b28;
            border-right: 5px solid #E8B429;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            position: relative;
            z-index: 2;
          }
          .spinner-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(206, 155, 40, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
            z-index: 1;
          }
          .loading-text {
            font-size: 20px;
            font-weight: 700;
            color: #333;
            margin: 0 0 8px 0;
          }
          .loading-subtext {
            font-size: 14px;
            color: #666;
            margin: 0;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { 
              opacity: 0.5;
              transform: translate(-50%, -50%) scale(1);
            }
            50% { 
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.1);
            }
          }
        `}</style>
      </DashboardLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2 className="error-title">Unable to Load Dashboard</h2>
          <p className="error-message">{error}</p>
          <button onClick={fetchDashboardStats} className="retry-btn">
            🔄 Retry
          </button>
        </div>
        <style jsx>{`
          .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 70vh;
            padding: 40px;
            text-align: center;
          }
          .error-icon {
            font-size: 64px;
            margin-bottom: 20px;
          }
          .error-title {
            font-size: 28px;
            font-weight: 700;
            color: #333;
            margin: 0 0 12px 0;
          }
          .error-message {
            font-size: 16px;
            color: #666;
            margin: 0 0 24px 0;
          }
          .retry-btn {
            padding: 12px 32px;
            background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
            color: #000;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(206, 155, 40, 0.3);
          }
          .retry-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(206, 155, 40, 0.5);
          }
        `}</style>
      </DashboardLayout>
    );
  }

  // Prepare pie chart data with multicolors
  const pieData = [
    { name: 'Pending', value: stats.statusBreakdown.pending, color: '#f59e0b' },
    { name: 'Confirmed', value: stats.statusBreakdown.confirmed, color: '#10b981' },
    { name: 'Cancelled', value: stats.statusBreakdown.cancelled, color: '#ef4444' },
    { name: 'Completed', value: stats.statusBreakdown.completed, color: '#3b82f6' },
  ].filter(item => item.value > 0);

  const totalBookings = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Dashboard Overview</h1>
            <p className="page-subtitle">Complete analytics and insights for Executive Fleet</p>
          </div>
          <button onClick={fetchDashboardStats} className="refresh-btn" disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"></path>
              </svg>
            Refresh
          </button>
        </div>

        {/* Stats Grid - 6 Cards */}
        <div className="stats-grid">
          {statusCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ color: card.iconColor }}>
                  <IconComponent size={40} strokeWidth={2} />
              </div>
              <div className="stat-info">
                <div className="stat-value">{card.value}</div>
                <div className="stat-label">{card.title}</div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Main Charts Section */}
        <div className="charts-container">
          {/* Bookings Over Time */}
          <div className="chart-card medium">
            <h3 className="chart-title">📈 Bookings Over Time (Last 30 Days)</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.bookingsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ce9b28" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ce9b28" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(206, 155, 40, 0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#999"
                    tick={{ fill: '#999', fontSize: 12 }}
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}
                    height={60}
                  />
                  <YAxis stroke="#999" tick={{ fill: '#999', fontSize: 12 }} width={40} />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#1a1a1a', 
                      border: '2px solid #ce9b28', 
                      borderRadius: '8px',
                  color: '#ffffff',
                      padding: '10px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                    labelStyle={{ color: '#ffffff', marginBottom: '5px' }}
                    itemStyle={{ color: '#ce9b28' }}
                    formatter={(value) => [`${value} bookings`, 'Count']}
                    labelFormatter={(date) => new Date(date).toLocaleDateString('en-AU', { month: 'long', day: 'numeric', year: 'numeric' })}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#ce9b28" 
                    strokeWidth={3}
                    fill="url(#goldGradient)"
                    dot={{ fill: '#E8B429', r: 4 }}
                    activeDot={{ r: 6, fill: '#fffbe9' }}
                  />
                </LineChart>
              </ResponsiveContainer>
                </div>
                </div>

          {/* Booking Status Breakdown */}
          <div className="chart-card">
            <h3 className="chart-title">📊 Booking Status Breakdown</h3>
            <div className="donut-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="48%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={false}
                    style={{ outline: 'none' }}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: '#1a1a1a', 
                      border: '2px solid #ce9b28', 
                      borderRadius: '10px',
                      color: '#ffffff',
                      padding: '12px 16px',
                      fontSize: '14px',
                  fontWeight: '600',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}
                    itemStyle={{
                      color: '#ffffff',
                      padding: '4px 0'
                    }}
                    labelStyle={{
                      color: '#ce9b28',
                      fontWeight: '700',
                      marginBottom: '6px'
                    }}
                    formatter={(value, name) => {
                      const percent = ((value / totalBookings) * 100).toFixed(1);
                      return [`${value} bookings (${percent}%)`, ''];
                    }}
                    labelFormatter={(name) => name}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={70}
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{ paddingTop: '25px', paddingBottom: '10px' }}
                    formatter={(value, entry) => {
                      const percent = ((entry.payload.value / totalBookings) * 100).toFixed(1);
                      return (
                        <span style={{ 
                          color: '#fff', 
                  fontSize: '14px',
                  fontWeight: '600',
                          marginLeft: '8px'
                        }}>
                          {`${value}: ${entry.payload.value} (${percent}%)`}
                        </span>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="center-stat" style={{ top: '45%' }}>
                <div className="center-stat-value">{totalBookings}</div>
                <div className="center-stat-label">Total</div>
            </div>
                    </div>
                  </div>

          {/* Vehicle Popularity */}
          <div className="chart-card">
            <h3 className="chart-title">🚗 Vehicle Type Popularity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.vehiclePopularity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(206, 155, 40, 0.1)" />
                <XAxis type="number" stroke="#999" tick={{ fill: '#999', fontSize: 12 }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#999" 
                  tick={{ fill: '#999', fontSize: 11 }}
                  width={120}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#000', 
                    border: '1px solid #ce9b28', 
                      borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="count">
                  {stats.vehiclePopularity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.vehicleColors[index % COLORS.vehicleColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
                </div>

          


          {/* Upcoming Trips Widget */}
          <div className="chart-card large">
            <h3 className="chart-title">🚀 Upcoming Trips (Next 48 Hours)</h3>
            <div className="trips-table">
              {stats.upcomingTrips.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Route</th>
                      <th>Pickup Time</th>
                      <th>Vehicle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.upcomingTrips.map(trip => (
                      <tr key={trip.id}>
                        <td>{trip.customerName}</td>
                        <td className="route-cell">
                          <span className="route-from">📍 {trip.pickupLocation.split(',')[0]}</span>
                          <span className="route-arrow">→</span>
                          <span className="route-to">🎯 {trip.dropoffLocation.split(',')[0]}</span>
                        </td>
                        <td>
                          {new Date(trip.pickupDate).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}
                          {' • '}
                          {formatTime(trip.pickupTime)}
                        </td>
                        <td>{trip.vehicleName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-trips">No upcoming trips in the next 48 hours</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-page {
          
          max-width: 1800px;
          margin: 0 auto;
          
          min-height: 100vh;
          width: 100% !important;
          max-width: 100vw !important;
          box-sizing: border-box !important;
          overflow-x: hidden !important;
        }

        .dashboard-page .page-header {
          margin-bottom: 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        .dashboard-page .page-title {
          font-size: 42px;
          font-weight: 900;
          background: linear-gradient(90deg, #ce9b28 0%, #ce9b28 0%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 8px 0;
          letter-spacing: -1px;
        }

        .dashboard-page .page-subtitle {
          color: #999;
          font-size: 16px;
          margin: 0;
        }

        .dashboard-page .refresh-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          color: #000;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.3);
        }

        .dashboard-page .refresh-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(206, 155, 40, 0.5);
        }

        .dashboard-page .refresh-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Stats Grid - 4 Cards in one row */
        .dashboard-page .stats-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 24px !important;
          margin-bottom: 40px !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        .dashboard-page .stat-card {
          padding: 32px;
          border-radius: 16px;
          background: linear-gradient(145deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 1));
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
          overflow: hidden;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          min-width: 0 !important;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          padding: 2px;
          background: linear-gradient(135deg, #ce9b28, #E8B429, #ce9b28);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.6;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.6),
            0 0 60px rgba(206, 155, 40, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-card:hover::after {
          box-shadow: 
            0 12px 48px rgba(0, 0, 0, 0.7),
            0 0 80px rgba(206, 155, 40, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        .dashboard-page .stat-card .stat-icon {
          filter: drop-shadow(0 4px 12px rgba(206, 155, 40, 0.4));
          z-index: 1;
        }

        .dashboard-page .stat-card .stat-info {
          flex: 1;
          z-index: 1;
          min-width: 0;
          width: 100%;
        }

        .dashboard-page .stat-card .stat-value {
          font-size: 42px;
          font-weight: 900;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 8px;
          text-shadow: 0 2px 8px rgba(206, 155, 40, 0.3);
        }

        .dashboard-page .stat-card .stat-label {
          font-size: 14px;
          font-weight: 600;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Charts Container */
        .dashboard-page .charts-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        .dashboard-page .chart-card {
          background: linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.95));
          border: 2px solid rgba(206, 155, 40, 0.3);
          border-radius: 16px;
          padding: 28px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.6),
            0 0 60px rgba(206, 155, 40, 0.15);
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          min-width: 0 !important;
        }

        .chart-card.large {
          grid-column: span 2;
        }

        .chart-card.medium {
          grid-column: span 2;
        }

        .chart-title {
          font-size: 20px;
          font-weight: 700;
          color: #fffbe9;
          margin: 0 0 24px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .chart-wrapper {
          width: 100%;
          height: 330px;
          display: flex;
          align-items: center;
          justifyContent: center;
        }

        .donut-chart-wrapper {
          position: relative;
          height: 280px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .center-stat {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
          z-index: 10;
        }

        .center-stat-value {
          font-size: 36px;
          font-weight: 900;
          color: #ce9b28;
          line-height: 1;
          margin-bottom: 4px;
          text-shadow: 0 2px 8px rgba(206, 155, 40, 0.3);
        }

        .center-stat-label {
          font-size: 14px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 600;
        }

        /* Funnel */
        .funnel-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 20px 0;
        }

        .funnel-stage {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          border-radius: 12px;
          color: #000;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .funnel-stage:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        .funnel-label {
          font-size: 16px;
        }

        .funnel-value {
          font-size: 24px;
          font-weight: 900;
        }

        /* Trips Table */
        .trips-table {
          overflow-x: auto;
        }

        .trips-table table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .trips-table thead {
          background: rgba(206, 155, 40, 0.1);
        }

        .trips-table th {
          padding: 14px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 700;
          color: #ce9b28;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 2px solid rgba(206, 155, 40, 0.3);
        }

        .trips-table td {
          padding: 16px;
          font-size: 14px;
          color: #fff;
          border-bottom: 1px solid rgba(206, 155, 40, 0.1);
        }

        .trips-table tr:hover td {
          background: rgba(206, 155, 40, 0.05);
        }

        .route-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .route-from, .route-to {
          color: #999;
        }

        .route-arrow {
          color: #ce9b28;
          font-weight: 700;
        }

        .no-trips {
          text-align: center;
          padding: 60px 20px;
          color: #666;
          font-size: 15px;
        }

        /* Responsive - Tablet/Desktop */
        @media (max-width: 1400px) {
          .charts-container {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .chart-card.large {
            grid-column: span 2;
          }

          .chart-card.medium {
            grid-column: span 2;
          }
        }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .stat-card {
            padding: 24px;
          }

          .stat-value {
            font-size: 36px;
          }

          .stat-label {
            font-size: 13px;
          }
        }

        @media (max-width: 1024px) {
          .dashboard-page {
            padding: 24px;
          }

          .charts-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .chart-card.large,
          .chart-card.medium {
            grid-column: span 1;
          }

          .chart-card {
            padding: 24px;
          }

          .page-title {
            font-size: 36px;
          }
        }

        /* Mobile Responsive - Tablet */
        @media (max-width: 768px) {
          .dashboard-page {
            padding: 16px !important;
            background: #f5f5f5 !important;
            width: 100% !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }

          .dashboard-page .page-header {
          flex-direction: column !important;
          gap: 16px !important;
            margin-bottom: 24px !important;
          }

          .dashboard-page .page-title {
            font-size: 28px !important;
            letter-spacing: -0.5px !important;
          }

          .dashboard-page .page-subtitle {
            font-size: 14px !important;
          }

          .dashboard-page .refresh-btn {
            align-self: stretch !important;
            width: 100% !important;
            justify-content: center !important;
            padding: 14px 20px !important;
            font-size: 14px !important;
          }

          .dashboard-page .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            margin-bottom: 24px !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .dashboard-page .stat-card {
            padding: 18px !important;
            gap: 12px !important;
            min-height: auto !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .dashboard-page .stat-card .stat-icon {
            margin-bottom: 8px !important;
          }

          .dashboard-page .stat-card .stat-icon svg {
            width: 32px !important;
            height: 32px !important;
          }

          .dashboard-page .stat-card .stat-value {
            font-size: 28px !important;
            line-height: 1 !important;
            margin-bottom: 4px !important;
          }

          .dashboard-page .stat-card .stat-label {
            font-size: 11px !important;
            letter-spacing: 0.3px !important;
            line-height: 1.3 !important;
          }

          .dashboard-page .charts-container {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .dashboard-page .chart-card {
            padding: 20px !important;
          }

          .dashboard-page .chart-title {
            font-size: 16px !important;
            margin-bottom: 16px !important;
          }

          /* Make trips table scrollable */
          .trips-table {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          .trips-table table {
            min-width: 600px;
          }

          .trips-table th,
          .trips-table td {
            padding: 12px 10px;
          font-size: 12px;
          }

          .trips-table th {
            font-size: 11px;
          }

          .route-cell {
          font-size: 12px;
            gap: 6px;
          }

          .route-from, .route-to {
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
          white-space: nowrap;
        }

          /* Funnel responsive */
          .funnel-stage {
            padding: 0 16px;
            height: 60px;
          }

          .funnel-label {
            font-size: 13px;
          }

          .funnel-value {
            font-size: 20px;
          }
        }

        /* Mobile Responsive - Phone */
        @media (max-width: 480px) {
          .dashboard-page {
            padding: 12px !important;
            width: 100% !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }

          .dashboard-page .page-header {
            margin-bottom: 20px !important;
          }

          .dashboard-page .page-title {
            font-size: 24px !important;
          }

          .dashboard-page .page-subtitle {
            font-size: 13px !important;
          }

          .dashboard-page .refresh-btn {
            padding: 12px 16px !important;
            font-size: 13px !important;
          }

          .dashboard-page .refresh-btn svg {
            width: 16px !important;
            height: 16px !important;
          }

          .dashboard-page .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            margin-bottom: 20px !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .dashboard-page .stat-card {
            padding: 16px !important;
            gap: 10px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .stat-card::before {
            padding: 1.5px;
          }

          .dashboard-page .stat-card .stat-icon {
            margin-bottom: 6px !important;
          }

          .dashboard-page .stat-card .stat-icon svg {
            width: 28px !important;
            height: 28px !important;
          }

          .dashboard-page .stat-card .stat-value {
            font-size: 26px !important;
            line-height: 1 !important;
            margin-bottom: 4px !important;
          }

          .dashboard-page .stat-card .stat-label {
            font-size: 10px !important;
            line-height: 1.2 !important;
          }

          .charts-container {
            gap: 12px;
          }

          .chart-card {
            padding: 16px;
            border-radius: 12px;
          }

          .chart-title {
            font-size: 14px;
            margin-bottom: 12px;
          }

          /* Adjust chart heights for mobile */
          .chart-wrapper {
            height: 280px;
          }

          .donut-chart-wrapper {
            height: 350px;
          }

          /* Center stat in donut */
          .center-stat-value {
            font-size: 28px;
          }

          .center-stat-label {
            font-size: 11px;
            letter-spacing: 1px;
          }

          /* Adjust donut size for mobile */
          .donut-chart-wrapper .recharts-pie {
            transform: scale(0.9);
          }

          /* Legend text smaller on mobile */
          .donut-chart-wrapper .recharts-legend-item-text {
            font-size: 12px !important;
          }

          /* Trips table mobile optimization */
          .trips-table {
            margin: 0 -16px;
            padding: 0 16px;
          }

          .trips-table th,
          .trips-table td {
            padding: 10px 8px;
            font-size: 11px;
          }

          .trips-table th {
            font-size: 10px;
            letter-spacing: 0.5px;
          }

          .no-trips {
            padding: 40px 16px;
            font-size: 13px;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 375px) {
          .dashboard-page {
            padding: 10px !important;
            width: 100% !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }
          
          .dashboard-page .page-title {
            font-size: 22px !important;
          }

          .dashboard-page .page-subtitle {
            font-size: 12px !important;
          }

          .dashboard-page .refresh-btn {
            padding: 10px 14px !important;
            font-size: 12px !important;
          }

          .dashboard-page .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .dashboard-page .stat-card {
            padding: 14px !important;
            gap: 8px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .dashboard-page .stat-card .stat-icon {
            margin-bottom: 4px !important;
          }

          .dashboard-page .stat-card .stat-icon svg {
            width: 26px !important;
            height: 26px !important;
          }

          .dashboard-page .stat-card .stat-value {
            font-size: 24px !important;
            line-height: 1 !important;
            margin-bottom: 3px !important;
          }

          .dashboard-page .stat-card .stat-label {
            font-size: 9px !important;
            line-height: 1.2 !important;
          }

          .chart-card {
            padding: 12px;
          }

          .chart-title {
            font-size: 13px;
            margin-bottom: 10px;
          }

          .chart-wrapper {
            height: 250px;
          }

          .donut-chart-wrapper {
            height: 320px;
          }

          .center-stat-value {
            font-size: 24px;
          }

          .center-stat-label {
            font-size: 10px;
          }

          .donut-chart-wrapper .recharts-legend-item-text {
            font-size: 11px !important;
          }

          /* Funnel for small mobile */
          .funnel-stage {
            padding: 0 12px;
            height: 55px;
          }

          .funnel-label {
            font-size: 12px;
          }

          .funnel-value {
            font-size: 18px;
          }

          /* Trips table extra small */
          .trips-table table {
            min-width: 550px;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
