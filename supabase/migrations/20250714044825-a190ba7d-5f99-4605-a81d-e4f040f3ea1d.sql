-- Create trigger function to auto-create profiles when users sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data for development
INSERT INTO public.events (title, description, date, time, location, type, max_attendees, current_attendees, price, image_url) VALUES
('Sustainable Farming Workshop', 'Learn modern sustainable farming techniques and organic certification processes.', '2024-01-25', '09:00:00', 'Green Valley Farm Center', 'workshop', 50, 23, 75.00, 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400'),
('Agricultural Technology Expo', 'Explore the latest in agricultural technology, from drones to smart irrigation systems.', '2024-02-15', '10:00:00', 'Tech Convention Center', 'conference', 200, 87, 150.00, 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400'),
('Crop Disease Management Seminar', 'Expert-led session on identifying and managing common crop diseases.', '2024-03-10', '14:00:00', 'University Extension Office', 'seminar', 30, 15, 25.00, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'),
('Farmers Market Networking', 'Connect with local farmers, suppliers, and agricultural business owners.', '2024-04-05', '16:00:00', 'Downtown Community Center', 'networking', 100, 45, 0.00, 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400');

INSERT INTO public.market_data (commodity, price, change_percent, volume, market_cap) VALUES
('Wheat', 245.50, 2.3, 15000, 1250000),
('Corn', 189.75, -1.2, 22000, 2100000),
('Soybeans', 312.20, 4.1, 18000, 1800000),
('Rice', 156.80, 0.8, 12000, 980000),
('Cotton', 78.90, -2.5, 8500, 650000),
('Coffee', 425.60, 6.2, 25000, 3200000);

-- Insert sample notifications (these would normally be created by the system)
INSERT INTO public.notifications (user_id, title, message, type, read) VALUES
-- Note: These will use a placeholder UUID, in real app they'd use actual user IDs
('00000000-0000-0000-0000-000000000000', 'Welcome to AgriBusiness!', 'Thank you for joining our platform. Explore all the features available to you.', 'info', false),
('00000000-0000-0000-0000-000000000000', 'New Market Update', 'Wheat prices have increased by 2.3% today. Check the market section for details.', 'market', false),
('00000000-0000-0000-0000-000000000000', 'Event Reminder', 'Don''t forget about the Sustainable Farming Workshop next week!', 'reminder', true),
('00000000-0000-0000-0000-000000000000', 'System Maintenance', 'Scheduled maintenance will occur this Sunday from 2-4 AM.', 'warning', false);

-- Insert sample messages
INSERT INTO public.messages (sender_id, recipient_id, subject, content, read) VALUES
('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', 'Welcome Message', 'Welcome to our AgriBusiness platform! We''re excited to have you on board.', false),
('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', 'Market Opportunity', 'There''s a great opportunity in the organic produce market. Would you like to discuss?', false),
('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', 'Technical Support', 'How can we help you get the most out of our platform? Feel free to reach out anytime.', true);