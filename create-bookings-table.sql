-- Create bookings table for Executive Fleet
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  booking_reference TEXT UNIQUE NOT NULL,
  
  -- Trip Details
  booking_type TEXT NOT NULL CHECK (booking_type IN ('distance', 'hourly')),
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  pickup_location TEXT NOT NULL,
  pickup_lat DECIMAL(10, 8),
  pickup_lng DECIMAL(11, 8),
  dropoff_location TEXT NOT NULL,
  dropoff_lat DECIMAL(10, 8),
  dropoff_lng DECIMAL(11, 8),
  
  -- Additional Destination (optional)
  additional_destination TEXT,
  additional_destination_lat DECIMAL(10, 8),
  additional_destination_lng DECIMAL(11, 8),
  
  -- Return Trip (optional)
  is_return_trip BOOLEAN DEFAULT FALSE,
  return_date DATE,
  return_time TIME,
  
  -- Calculated Route Info
  calculated_distance_km DECIMAL(10, 2),
  calculated_duration_minutes INTEGER,
  
  -- Vehicle Selection
  vehicle_id INTEGER NOT NULL,
  vehicle_name TEXT NOT NULL,
  vehicle_type TEXT,
  
  -- Personal Details
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  number_of_passengers INTEGER NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('Airport Transfer', 'Corporate Travel', 'Special Event', 'Winery Tour')),
  special_instructions TEXT,
  
  -- Pricing (to be set by admin)
  estimated_price DECIMAL(10, 2),
  final_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'AUD',
  
  -- Booking Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_date ON bookings(pickup_date DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON bookings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (adjust based on your Supabase setup)
-- ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE bookings IS 'Stores all chauffeur booking requests for Executive Fleet';
COMMENT ON COLUMN bookings.booking_reference IS 'Unique booking reference number shown to customers';
COMMENT ON COLUMN bookings.status IS 'Booking status: pending (new), confirmed (admin approved), cancelled, completed';
COMMENT ON COLUMN bookings.calculated_distance_km IS 'Auto-calculated distance from Google Maps API';
COMMENT ON COLUMN bookings.estimated_price IS 'Initial price estimate (if available)';
COMMENT ON COLUMN bookings.final_price IS 'Final price set by admin after confirmation';

