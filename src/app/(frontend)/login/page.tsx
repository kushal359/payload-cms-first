'use client';

import {useState} from 'react';
import { Center } from '@mantine/core';
import { Container } from '@mantine/core';
import { Stack } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { PasswordInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { Card } from '@mantine/core';

export default function login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e:any) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

        const data = await res.json();

        // Role-based redirect
        if (data.user.role === 'admin' || data.user.role === 'editor') {
            window.location.href = '/admin';
        } else {
            window.location.href = '/';
        }

        if (!res.ok) {
            alert(data.errors?.[0]?.message || 'Login failed');
        return;
        }

    };

    return(
        <Container size="xl" style={{ width:'100%', height: '100vh' }}>
            <Center style={{ height: '100%' }}>
                <Card>
                    <form onSubmit={handleLogin}>
                        <Stack >
                            <TextInput
                            label="Email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                            <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                            <Button type="submit">Login</Button>
                        </Stack>
                    </form>
                </Card>
            </Center>
            </Container>
    );
}