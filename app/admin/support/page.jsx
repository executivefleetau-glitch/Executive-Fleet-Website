"use client";

import { useState } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { 
  Book, 
  Calendar, 
  Mail, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  Search,
  Play,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: Book },
    { id: 'bookings', title: 'Managing Bookings', icon: Calendar },
    { id: 'contacts', title: 'Contact Inquiries', icon: Mail },
    { id: 'blog', title: 'Blog Management', icon: FileText },
    { id: 'faq', title: 'Common Questions', icon: HelpCircle },
  ];

  const guides = {
    'getting-started': {
      title: 'Getting Started with the Admin Dashboard',
      description: 'Learn the basics of navigating and using your Executive Fleet admin dashboard.',
      steps: [
        {
          title: 'Dashboard Overview',
          content: `The Dashboard is your home base. Here you'll see:
          
• **Today's Snapshot** - Quick view of today's trips, pending quotes, and confirmed bookings
• **Needs Attention** - Items that require your immediate action
• **Upcoming Trips** - Bookings scheduled for the next 48 hours
• **Performance Charts** - Visual analytics of your booking trends`
        },
        {
          title: 'Navigation Menu',
          content: `The sidebar menu on the left gives you quick access to all features:

• **Dashboard** - Overview and key metrics
• **Bookings** - View and manage all trip bookings
• **Contact Inquiries** - Messages from potential customers
• **Blog** - Create and manage blog articles
• **Support** - You're here! Help documentation
• **Profile** - Your account settings`
        },
        {
          title: 'Quick Actions',
          content: `At the top of your dashboard, you'll find Quick Actions for common tasks:

• **View Bookings** - Jump directly to all bookings
• **Send Quotes** - See pending quotes that need pricing
• **Inquiries** - Check new customer messages
• **New Blog Post** - Start writing a new article`
        },
      ]
    },
    'bookings': {
      title: 'Managing Bookings',
      description: 'Everything you need to know about handling customer bookings.',
      steps: [
        {
          title: 'Viewing Bookings',
          content: `The Bookings page shows all trip requests organized in tabs:

• **Upcoming** - Confirmed trips happening soon
• **Pending Quotes** - New bookings waiting for pricing
• **Confirmed** - Trips that customers have confirmed
• **Completed** - Past trips that are done
• **Cancelled** - Trips that were cancelled
• **All** - View every booking`
        },
        {
          title: 'Sending Price Quotes',
          content: `When a new booking comes in:

1. Click on the booking to view details
2. Review the trip information (pickup, dropoff, date, time)
3. Click "Send Quote" button
4. Enter your price
5. The customer will receive an email with the quote
6. They can confirm or request changes`
        },
        {
          title: 'Following Up',
          content: `Keep track of customer communications:

• Use the "Follow-up" button to mark important actions
• Add notes using the follow-up tags
• Options include: Reminder, Discount Offer, Call Request
• Filter bookings by "Contacted" or "Not Contacted" status`
        },
        {
          title: 'Editing Bookings',
          content: `To modify a booking:

1. Find the booking in the list
2. Click the "Edit" button
3. Update any details as needed
4. Changes are saved automatically
5. Consider notifying the customer if significant changes are made`
        },
      ]
    },
    'contacts': {
      title: 'Handling Contact Inquiries',
      description: 'Respond to customer messages and inquiries effectively.',
      steps: [
        {
          title: 'Viewing Inquiries',
          content: `Contact inquiries come from the website's contact form:

• Each inquiry shows the customer's name, email, and message
• Click on any inquiry to see the full details
• New inquiries appear at the top of the list`
        },
        {
          title: 'Responding to Customers',
          content: `To reply to an inquiry:

1. Click on the inquiry to open it
2. Click "Send Email Reply"
3. Your default email app will open
4. The customer's email and subject will be pre-filled
5. Type your response and send`
        },
        {
          title: 'Managing Inquiries',
          content: `Keep your inbox organized:

• Delete old or spam inquiries using the delete button
• Inquiries are sorted by newest first
• Consider converting promising inquiries to bookings manually`
        },
      ]
    },
    'blog': {
      title: 'Blog Management',
      description: 'Create and publish blog articles to engage your audience.',
      steps: [
        {
          title: 'Creating a New Post',
          content: `To write a new blog article:

1. Go to Blog in the sidebar
2. Click "Create New Post" button
3. Fill in the title, excerpt, and content
4. Add a featured image
5. Select a category and add tags
6. Choose to save as Draft or Publish immediately`
        },
        {
          title: 'Using the Editor',
          content: `The blog editor supports rich text formatting:

• **Bold**, *italic*, and underline text
• Headings (H1, H2, H3)
• Bullet points and numbered lists
• Links and images
• Block quotes
• Use the toolbar at the top for formatting`
        },
        {
          title: 'Publishing Options',
          content: `Control when your post goes live:

• **Draft** - Save without publishing (only you can see it)
• **Published** - Immediately visible on the website
• **Scheduled** - Set a future date/time to auto-publish

You can change status anytime from the blog list.`
        },
        {
          title: 'SEO Settings',
          content: `Optimize your posts for search engines:

• Add a meta description (appears in search results)
• Include relevant keywords
• The system auto-generates the URL slug from your title
• Preview how your post will look before publishing`
        },
      ]
    },
  };

  const faqs = [
    {
      question: "How do I change my password?",
      answer: "Go to Profile in the sidebar menu. You'll find a 'Change Password' section where you can enter your current password and set a new one. Your password must be at least 8 characters."
    },
    {
      question: "Why am I not receiving notifications?",
      answer: "Make sure you've enabled notifications in the Dashboard. Look for the 'Notifications' section and click 'Enable Notifications'. You may need to allow notifications in your browser settings as well."
    },
    {
      question: "How do I cancel a booking?",
      answer: "Find the booking in the Bookings page, click to view details, then use the 'Cancel Booking' option. The customer will be notified automatically via email."
    },
    {
      question: "Can I edit a booking after it's confirmed?",
      answer: "Yes, you can edit confirmed bookings. Go to the booking details and click 'Edit'. Remember to notify the customer about any significant changes."
    },
    {
      question: "How do I see today's trips?",
      answer: "The Dashboard shows 'Today's Trips' in the snapshot section. You can also go to Bookings and filter by today's date, or check the 'Upcoming' tab for imminent trips."
    },
    {
      question: "What do the different booking statuses mean?",
      answer: "• Pending: New booking waiting for quote\n• Confirmed: Customer has accepted and booking is scheduled\n• Completed: Trip has finished\n• Cancelled: Booking was cancelled by customer or admin"
    },
    {
      question: "How do I install the app on my phone?",
      answer: "On the Dashboard, you'll see an 'Install' banner at the bottom. Click 'Install' to add Executive Fleet Admin to your home screen. On iPhone, use Safari and tap the Share button, then 'Add to Home Screen'."
    },
    {
      question: "The dashboard is loading slowly. What can I do?",
      answer: "Try refreshing the page using the 'Refresh' button. If it's still slow, check your internet connection. The dashboard caches data to load faster on repeat visits."
    },
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentGuide = guides[activeSection];

  return (
    <DashboardLayout>
      <div className="support-page">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Help & Support</h1>
            <p className="page-subtitle">Learn how to use the Executive Fleet admin dashboard</p>
          </div>
        </div>

        {/* Search */}
        <div className="search-box">
          <Search size={20} />
          <input 
            type="text"
            placeholder="Search help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Content Layout */}
        <div className="content-layout">
          {/* Sidebar Navigation */}
          <nav className="help-nav">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSearchQuery('');
                  }}
                >
                  <Icon size={18} />
                  <span>{section.title}</span>
                  <ChevronRight size={16} className="nav-arrow" />
                </button>
              );
            })}
          </nav>

          {/* Main Content */}
          <div className="help-content">
            {activeSection === 'faq' ? (
              /* FAQ Section */
              <div className="faq-section">
                <h2 className="content-title">Frequently Asked Questions</h2>
                <p className="content-desc">Quick answers to common questions</p>
                
                <div className="faq-list">
                  {(searchQuery ? filteredFaqs : faqs).map((faq, index) => (
                    <div 
                      key={index} 
                      className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                    >
                      <button 
                        className="faq-question"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown size={20} className="faq-icon" />
                      </button>
                      {expandedFaq === index && (
                        <div className="faq-answer">
                          {faq.answer.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {searchQuery && filteredFaqs.length === 0 && (
                    <div className="no-results">
                      <HelpCircle size={32} />
                      <p>No matching questions found</p>
                    </div>
                  )}
                </div>
              </div>
            ) : currentGuide ? (
              /* Guide Section */
              <div className="guide-section">
                <h2 className="content-title">{currentGuide.title}</h2>
                <p className="content-desc">{currentGuide.description}</p>

                <div className="steps-list">
                  {currentGuide.steps.map((step, index) => (
                    <div key={index} className="step-item">
                      <div className="step-header">
                        <div className="step-number">{index + 1}</div>
                        <h3 className="step-title">{step.title}</h3>
                      </div>
                      <div className="step-content">
                        {step.content.split('\n\n').map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Quick Help Cards */}
        <div className="quick-help">
          <h2 className="section-title">Need More Help?</h2>
          <div className="help-cards">
            <a href="mailto:team@cruxlabs.com.au" className="help-card">
              <Mail size={24} />
              <h3>Email Support</h3>
              <p>Contact us for technical assistance</p>
            </a>
            <a href="tel:+61450046310" className="help-card">
              <Play size={24} />
              <h3>Call Us</h3>
              <p>Speak directly with our team</p>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .support-page {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 24px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 4px 0;
        }

        .page-subtitle {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        /* Search */
        .search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .search-box svg { color: #999; flex-shrink: 0; }

        .search-box input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 15px;
          background: transparent;
        }

        .search-box input::placeholder { color: #999; }

        /* Content Layout */
        .content-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 24px;
          margin-bottom: 40px;
        }

        /* Help Navigation */
        .help-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .nav-item:hover {
          border-color: #ce9b28;
          color: #1a1a1a;
        }

        .nav-item.active {
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.1), rgba(232, 180, 41, 0.05));
          border-color: #ce9b28;
          color: #ce9b28;
        }

        .nav-item span { flex: 1; }

        .nav-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s ease;
        }

        .nav-item:hover .nav-arrow,
        .nav-item.active .nav-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Help Content */
        .help-content {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 32px;
        }

        .content-title {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }

        .content-desc {
          font-size: 14px;
          color: #666;
          margin: 0 0 28px 0;
        }

        /* Steps */
        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .step-item {
          padding-bottom: 24px;
          border-bottom: 1px solid #f3f4f6;
        }

        .step-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .step-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .step-number {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ce9b28, #E8B429);
          color: #000;
          font-size: 13px;
          font-weight: 700;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .step-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }

        .step-content {
          padding-left: 40px;
        }

        .step-content p {
          font-size: 14px;
          color: #555;
          line-height: 1.7;
          margin: 0 0 12px 0;
          white-space: pre-wrap;
        }

        .step-content p:last-child { margin-bottom: 0; }

        /* FAQ */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .faq-item {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }

        .faq-item:hover,
        .faq-item.expanded {
          border-color: #ce9b28;
        }

        .faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 16px 20px;
          background: none;
          border: none;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          text-align: left;
          cursor: pointer;
        }

        .faq-icon {
          color: #999;
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .faq-item.expanded .faq-icon {
          transform: rotate(180deg);
          color: #ce9b28;
        }

        .faq-answer {
          padding: 0 20px 20px;
          animation: slideDown 0.2s ease;
        }

        .faq-answer p {
          font-size: 14px;
          color: #555;
          line-height: 1.7;
          margin: 0 0 8px 0;
        }

        .faq-answer p:last-child { margin-bottom: 0; }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .no-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 40px;
          color: #999;
          text-align: center;
        }

        .no-results p { margin: 0; font-size: 14px; }

        /* Quick Help */
        .quick-help {
          margin-top: 40px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 16px 0;
        }

        .help-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .help-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 28px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease;
        }

        .help-card:hover {
          border-color: #ce9b28;
          box-shadow: 0 4px 12px rgba(206, 155, 40, 0.1);
          transform: translateY(-2px);
        }

        .help-card svg { color: #ce9b28; }

        .help-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }

        .help-card p {
          font-size: 13px;
          color: #666;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .content-layout {
            grid-template-columns: 1fr;
          }

          .help-nav {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 8px;
            gap: 8px;
          }

          .nav-item {
            white-space: nowrap;
            padding: 10px 14px;
          }

          .nav-arrow { display: none; }

          .help-content { padding: 24px; }

          .step-content { padding-left: 0; margin-top: 12px; }

          .help-cards { grid-template-columns: 1fr; }
        }
      `}</style>
    </DashboardLayout>
  );
}
