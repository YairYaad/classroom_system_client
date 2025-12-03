import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const pages = [
        { name: 'Classes', path: '/classes' },
        { name: 'Students', path: '/students' },
        { name: 'Create New', path: '/create' },
    ];

    return (
        <AppBar position="static" sx={{ bgcolor: '#303f9f' }}>
            <Toolbar>
                {/* System Name */}
                <Typography 
                    variant="h6" 
                    noWrap 
                    component="div" 
                    sx={{ mr: 4, display: { xs: 'none', md: 'flex' } }}
                >
                    📚 Classroom Connect
                </Typography>

                {/* Navigation Buttons */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button
                            key={page.name}
                            onClick={() => navigate(page.path)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page.name}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};