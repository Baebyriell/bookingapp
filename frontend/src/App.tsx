import { useState, useEffect } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Box,
    Chip,
    CircularProgress
} from '@mui/material'
import { AccessTime, AttachMoney } from '@mui/icons-material'

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    duration_minutes: number;
}

function App() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Mock data for now - will be replaced with API call
    const mockServices: Service[] = [
        {
            id: 1,
            name: "Web Development Consultation",
            description: "One-on-one consultation for your web development needs. Get expert advice on technology stack, architecture, and best practices.",
            price: 100.00,
            duration_minutes: 60
        },
        {
            id: 2,
            name: "UI/UX Design Review",
            description: "Professional review of your user interface and experience. Comprehensive analysis and actionable recommendations.",
            price: 150.00,
            duration_minutes: 90
        },
        {
            id: 3,
            name: "Mobile App Development Planning",
            description: "Strategic planning session for mobile app development. Platform selection, feature prioritization, and roadmap creation.",
            price: 200.00,
            duration_minutes: 120
        },
        {
            id: 4,
            name: "Database Optimization",
            description: "Performance tuning and optimization for your database. Query optimization, indexing strategies, and scaling solutions.",
            price: 175.00,
            duration_minutes: 90
        },
        {
            id: 5,
            name: "SEO Audit",
            description: "Comprehensive SEO audit and recommendations. Technical SEO, content strategy, and competitive analysis.",
            price: 125.00,
            duration_minutes: 60
        }
    ];

    useEffect(() => {
        // Simulate API call
        const fetchServices = async () => {
            try {
                setLoading(true);
                // TODO: Replace with actual API call
                // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/services`);
                // const data = await response.json();

                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                setServices(mockServices);
                setError(null);
            } catch (err) {
                setError('Failed to load services. Please try again later.');
                console.error('Error fetching services:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours > 0 && remainingMinutes > 0) {
            return `${hours}h ${remainingMinutes}m`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${remainingMinutes}m`;
        }
    };

    const handleBookService = (serviceId: number, serviceName: string) => {
        // TODO: Implement booking logic (Day 3)
        alert(`Booking functionality coming soon!\nService: ${serviceName}`);
    };

    if (loading) {
        return (
            <Box className="min-h-screen bg-gray-50">
                <AppBar position="static" className="bg-blue-600">
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            West Booking
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg" className="py-8">
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                        <CircularProgress size={60} />
                    </Box>
                </Container>
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="min-h-screen bg-gray-50">
                <AppBar position="static" className="bg-blue-600">
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            West Booking
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg" className="py-8">
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                        <Typography variant="h6" color="error" align="center">
                            {error}
                        </Typography>
                    </Box>
                </Container>
            </Box>
        );
    }

    return (
        <Box className="min-h-screen bg-gray-50">
            {/* Header */}
            <AppBar position="static" className="bg-blue-600 shadow-lg">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        West Booking
                    </Typography>
                    <Button color="inherit" className="ml-4">
                        Login
                    </Button>
                    <Button color="inherit" className="ml-2">
                        Sign Up
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <Container maxWidth="lg">
                    <Typography variant="h2" component="h1" className="font-bold mb-4 text-center">
                        Book Professional Services
                    </Typography>
                    <Typography variant="h5" className="text-center text-blue-100 max-w-2xl mx-auto">
                        Discover and book high-quality services from our curated network of professionals
                    </Typography>
                </Container>
            </Box>

            {/* Services Section */}
            <Container maxWidth="lg" className="py-12">
                <Typography variant="h4" component="h2" className="font-bold mb-8 text-center text-gray-800">
                    Available Services
                </Typography>

                <Grid container spacing={4}>
                    {services.map((service) => (
                        <Grid item xs={12} md={6} lg={4} key={service.id}>
                            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                                <CardContent className="p-6">
                                    <Typography variant="h6" component="h3" className="font-bold mb-3 text-gray-800">
                                        {service.name}
                                    </Typography>

                                    <Typography variant="body2" className="text-gray-600 mb-4 leading-relaxed">
                                        {service.description}
                                    </Typography>

                                    <Box className="flex justify-between items-center mb-4">
                                        <Chip
                                            icon={<AttachMoney />}
                                            label={formatPrice(service.price)}
                                            color="primary"
                                            variant="outlined"
                                            className="font-semibold"
                                        />
                                        <Chip
                                            icon={<AccessTime />}
                                            label={formatDuration(service.duration_minutes)}
                                            color="secondary"
                                            variant="outlined"
                                        />
                                    </Box>
                                </CardContent>

                                <CardActions className="p-6 pt-0">
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        className="bg-blue-600 hover:bg-blue-700 py-3"
                                        onClick={() => handleBookService(service.id, service.name)}
                                    >
                                        Book Now
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Footer */}
            <Box className="bg-gray-800 text-white py-8 mt-16">
                <Container maxWidth="lg">
                    <Typography variant="body2" align="center" className="text-gray-300">
                        © 2025 West Booking. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}

export default App