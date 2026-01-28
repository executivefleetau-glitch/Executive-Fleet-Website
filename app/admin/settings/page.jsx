"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { Bell, Mail, Shield, Globe, Moon, Sun, Smartphone, Save, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newBookingAlerts: true,
    contactInquiryAlerts: true,
    darkMode: false,
    compactView: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse settings:', e);
      }
    }
  }, []);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const SettingToggle = ({ label, description, value, onChange, icon: Icon }) => (
    <div className="setting-item">
      <div className="setting-info">
        <div className="setting-icon">
          <Icon size={20} />
        </div>
        <div className="setting-text">
          <span className="setting-label">{label}</span>
          <span className="setting-description">{description}</span>
        </div>
      </div>
      <button 
        className={`toggle-switch ${value ? 'active' : ''}`}
        onClick={onChange}
        role="switch"
        aria-checked={value}
      >
        <span className="toggle-knob"></span>
      </button>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="settings-page">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your dashboard preferences and notifications</p>
        </div>

        <div className="settings-content">
          {/* Notification Settings */}
          <section className="settings-section">
            <div className="section-header">
              <Bell size={22} />
              <h2>Notifications</h2>
            </div>
            <div className="settings-card">
              <SettingToggle
                icon={Mail}
                label="Email Notifications"
                description="Receive email alerts for important updates"
                value={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <SettingToggle
                icon={Smartphone}
                label="Push Notifications"
                description="Get instant push notifications on your device"
                value={settings.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
              />
              <SettingToggle
                icon={Bell}
                label="New Booking Alerts"
                description="Be notified when a new booking is received"
                value={settings.newBookingAlerts}
                onChange={() => handleToggle('newBookingAlerts')}
              />
              <SettingToggle
                icon={Mail}
                label="Contact Inquiry Alerts"
                description="Be notified when someone submits a contact form"
                value={settings.contactInquiryAlerts}
                onChange={() => handleToggle('contactInquiryAlerts')}
              />
            </div>
          </section>

          {/* Display Settings */}
          <section className="settings-section">
            <div className="section-header">
              <Globe size={22} />
              <h2>Display</h2>
            </div>
            <div className="settings-card">
              <SettingToggle
                icon={settings.darkMode ? Moon : Sun}
                label="Dark Mode"
                description="Switch to dark theme for the dashboard"
                value={settings.darkMode}
                onChange={() => handleToggle('darkMode')}
              />
              <SettingToggle
                icon={Shield}
                label="Compact View"
                description="Show more content with reduced spacing"
                value={settings.compactView}
                onChange={() => handleToggle('compactView')}
              />
            </div>
          </section>

          {/* System Info */}
          <section className="settings-section">
            <div className="section-header">
              <Shield size={22} />
              <h2>System Information</h2>
            </div>
            <div className="settings-card info-card">
              <div className="info-item">
                <span className="info-label">Version</span>
                <span className="info-value">1.0.0</span>
              </div>
              <div className="info-item">
                <span className="info-label">Environment</span>
                <span className="info-value">Production</span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Updated</span>
                <span className="info-value">{new Date().toLocaleDateString('en-AU')}</span>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="settings-actions">
            <button 
              className={`save-btn ${saved ? 'saved' : ''}`}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : saved ? (
                <>
                  <CheckCircle size={18} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .settings-page {
          max-width: 800px;
        }

        .settings-header {
          margin-bottom: 32px;
        }

        .settings-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px 0;
        }

        .settings-header p {
          font-size: 15px;
          color: #666;
          margin: 0;
        }

        .settings-content {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .settings-section {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0f0f0;
          color: #1a1a2e;
        }

        .section-header h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .settings-card {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .setting-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-radius: 12px;
          transition: background 0.2s ease;
        }

        .setting-item:hover {
          background: #f8f9fa;
        }

        .setting-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .setting-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.1) 0%, rgba(232, 180, 41, 0.05) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ce9b28;
        }

        .setting-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .setting-label {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a2e;
        }

        .setting-description {
          font-size: 13px;
          color: #888;
        }

        .toggle-switch {
          width: 52px;
          height: 28px;
          background: #e0e0e0;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
          padding: 0;
        }

        .toggle-switch.active {
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
        }

        .toggle-knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 22px;
          height: 22px;
          background: #ffffff;
          border-radius: 50%;
          transition: transform 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .toggle-switch.active .toggle-knob {
          transform: translateX(24px);
        }

        .info-card {
          gap: 0;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-label {
          font-size: 14px;
          color: #666;
        }

        .info-value {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
        }

        .settings-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 8px;
        }

        .save-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          color: #000000;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.35);
        }

        .save-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .save-btn.saved {
          background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
          color: #ffffff;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-top-color: #000000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .settings-header h1 {
            font-size: 24px;
          }

          .settings-section {
            padding: 20px 16px;
          }

          .setting-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 16px 12px;
          }

          .setting-info {
            width: 100%;
          }

          .toggle-switch {
            align-self: flex-end;
          }

          .save-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
