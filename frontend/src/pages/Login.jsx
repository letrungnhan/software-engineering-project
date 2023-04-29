import React from 'react'
import {Box, Button, Container} from '@mui/material'
import Logo from '../assets/images/logo-white.png'
import video from '../assets/images/video-about-us.mp4'
import PersonIcon from "@mui/icons-material/Person";

const Login = () => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Container>
            <Box component="div" className="background-login">
                <video width='auto' height='100%' loop autoPlay muted>
                    <source src={video} type="video/mp4"></source>
                </video>
            </Box>
            <Box sx={{
                position: 'fixed',
                left: '50%',
                top: '30%',
                transform: 'translate(-50%, -50%)',
                zIndex: '3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4rem',
                flexDirection: 'column',
            }}>
                <Box component="img"
                     src={Logo} alt='Logo Spotify'
                     className="logo"
                     sx={{maxWidth: '350px'}}/>
                <Box sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '1rem 1.25rem',
                    minWidth: '400px',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    fontWeight: '400',
                    color: '#ccc',
                }}>
                    <Box component="div" sx={{
                        textAlign: 'left',
                        paddingBottom: '.6rem',
                        marginBottom: '1.2rem',
                        borderBottom: '1px solid rgba(255, 255, 255,.1)',
                        fontSize: '1.05rem', fontWeight: '600'
                    }}>
                        Đăng nhập tài khoản
                    </Box>
                    <Box sx={{
                        display: 'flex', alignItems: 'center',
                        fontSize: '1rem',
                        marginBottom: '30px',
                        backgroundColor: 'white',
                        padding: '0.6rem 0',
                        borderRadius: '5px',
                    }}>
                        <Box component={"label"} htmlFor={"email"} sx={{
                            minWidth: '50px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <PersonIcon sx={{
                                color: "black",
                                fontSize:'28px',
                                '&:hover': {
                                    color: "black",
                                }
                            }}/>
                        </Box>
                        <Box component={"input"} type={"email"} name={"email"} sx={{
                            backgroundColor: 'white',
                            outline: 'none',
                            border: 'none',
                            flex: '1',
                        }}></Box>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'var(--primary-color)',
                            padding: '.5rem 1.225rem',
                            transition: 'all .45s ease-out',
                            '&:hover': {
                                backgroundColor: 'var(--primary-color)',
                            }
                        }}>
                        Đăng nhập
                    </Button>
                </Box>
            </Box>
        </Container>

    );
};

export default Login;