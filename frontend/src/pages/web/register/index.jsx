import React, {useState} from 'react'
import {Box, Button, Container} from '@mui/material'
import Logo from '../../../assets/images/logo-white.png'
import video from '../../../assets/images/video-about-us.mp4'
import {Link} from "react-router-dom";
import Helmet from "../../../components/web/common/Helmet";
import {publicRequest} from "../../../utils/requestMethod";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

const Login = () => {
    const [birthday, setBirthday] = useState('1/4/2023');

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const birthday = '12/15/2001';
        const gender = 'MALE';
        await publicRequest().post("/auth/register", {name, email, password, birthday, gender})
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <Helmet title={"Đăng ký"}>
            <Container>
                <Box sx={{
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4rem',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        backgroundColor: 'rgba(0,0,0,.4)',
                        padding: '2rem 3rem 3rem 3rem',
                        minWidth: '450px',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '8px',
                        fontWeight: '500',
                        color: '#ccc',
                    }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', justifyItems: 'center', flexDirection: 'column'
                        }}>
                            <Box component="img"
                                 src={Logo} alt='Logo SpotifyService'
                                 className="logo"
                                 sx={{maxWidth: '150px', margin: 'auto'}}/>
                            <Box component="div" sx={{
                                textAlign: 'center', width: '100%',
                                paddingBottom: '.6rem',
                                marginBottom: '1.2rem',
                                marginTop: '1rem',
                                borderBottom: '1px solid rgba(255, 255, 255,.1)',
                                fontSize: '2rem', color: 'white', fontWeight: '600'
                            }}>
                                Music for everyone
                            </Box>
                        </Box>
                        <Box component={"form"} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                             onSubmit={handleRegister}>
                            <Box component={"input"} type={"text"} name={"name"} placeholder={'Name'} sx={{
                                backgroundColor: 'white',
                                display: 'block', width: '320px',
                                padding: '0.8rem 1rem',
                                borderRadius: '50px',
                                outline: 'none', border: 'none',
                                flex: '1', marginBottom: '16px',
                                fontSize: '0.9rem', color: '#000', fontWeight: 500,
                            }}></Box>
                            <Box component={"input"} type={"email"} name={"email"} placeholder={'Email'} sx={{
                                backgroundColor: 'white',
                                display: 'block', width: '320px',
                                padding: '0.8rem 1rem',
                                borderRadius: '50px',
                                outline: 'none', border: 'none',
                                flex: '1', marginBottom: '16px',
                                fontSize: '0.9rem', color: '#000', fontWeight: 500,
                            }}></Box>
                            <Box component={"input"} type={"password"} name={"password"} placeholder={'Password'} sx={{
                                backgroundColor: 'white',
                                display: 'block', width: '320px',
                                padding: '0.8rem 1rem',
                                borderRadius: '50px',
                                outline: 'none', border: 'none',
                                flex: '1', marginBottom: '16px',
                                fontSize: '0.9rem', color: '#000', fontWeight: 500,
                            }}></Box>
                            <DatePicker InputProps={{
                                disableUnderline: true
                            }} sx={{
                                width: '320px',
                                backgroundColor: 'white',
                                paddingRight: '0.5rem',
                                borderRadius: '50px',
                                fontSize: '0.9rem', color: '#000', fontWeight: 500,
                                '& input, ': {
                                    outline: 'none',
                                    border: 'none',
                                },
                                '& fieldset': {
                                    outline: 'none',
                                    border: 'none',
                                }
                            }} value={dayjs(birthday)} onChange={(value) => setBirthday(value)}/>
                            <Button type={"submit"}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'var(--primary-color)',
                                        display: 'block', width: '320px',
                                        padding: '0.6rem 1.8rem',
                                        borderRadius: '50px',
                                        transition: 'all .45s ease-out',
                                        fontSize: '0.975rem', color: '#fff', fontWeight: '800',
                                        '&:hover': {
                                            backgroundColor: 'var(--primary-color)',
                                        }
                                    }}>
                                <p>Sign in</p>
                            </Button>
                        </Box>
                        <Box sx={{
                            fontSize: '0.95rem',
                            color: 'var(--white-color-3)',
                            textAlign: 'center',
                            marginTop: '1.6rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        }}>
                            <p>Chưa có tài khoản ? </p>
                            <Box component={Link} to={"/signup"} sx={{
                                color: 'var(--white-color-3)',
                                textDecoration: 'none',
                            }}>
                                Đăng ký
                            </Box>
                        </Box>
                        <Box component={Link} to={"/"} sx={{
                            fontSize: '0.95rem',
                            color: 'var(--white-color-3)',
                            textDecoration: 'none',
                            textAlign: 'center',
                            display: 'block',
                            marginTop: '1.6rem'
                        }}>
                            Quên mật khẩu ?
                        </Box>
                    </Box>
                </Box>
                <Box component="div" className="background-login">
                    <video width='auto' height='100%' loop autoPlay muted>
                        <source src={video} type="video/mp4"></source>
                    </video>
                </Box>
            </Container>
        </Helmet>
    );
};

export default Login;