-- Clear existing data
DELETE FROM services;
DELETE FROM service;

-- Reset auto-increment (optional)
ALTER TABLE services AUTO_INCREMENT = 1;
ALTER TABLE service AUTO_INCREMENT = 1;

-- Insert sample services data
INSERT INTO services (name, description, price) VALUES
                                                    ('Web Development', 'Build custom websites and web applications', 1500.00),
                                                    ('Logo Design', 'Create professional logos and brand identity', 300.00),
                                                    ('SEO Consultation', 'Improve search rankings and website visibility', 500.00),
                                                    ('Mobile App Development', 'Build iOS and Android applications', 2500.00),
                                                    ('E-commerce Setup', 'Complete online store development', 2000.00),
                                                    ('Content Writing', 'Professional copywriting services', 150.00),
                                                    ('Social Media Management', 'Manage social media presence', 800.00),
                                                    ('UI/UX Design', 'User interface and experience design', 1200.00),
                                                    ('Database Design', 'Design and optimize database structures', 900.00),
                                                    ('API Development', 'Build RESTful APIs and microservices', 1800.00);

-- Insert individual service records
INSERT INTO service (service_name, provider, contact_email) VALUES
                                                                ('Premium Web Package', 'Tech Solutions Inc', 'contact@techsolutions.com'),
                                                                ('Startup Logo Bundle', 'Creative Designs Co', 'hello@creativedesigns.com'),
                                                                ('SEO Audit Service', 'Digital Marketing Pro', 'info@digitalmarketing.com'),
                                                                ('Mobile App Consultation', 'App Development Studio', 'team@appstudio.com'),
                                                                ('Full Stack Development', 'Code Masters LLC', 'info@codemasters.com'),
                                                                ('Brand Identity Package', 'Design Studio Pro', 'hello@designstudio.com');