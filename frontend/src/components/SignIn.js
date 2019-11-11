import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CURRENT_USER = gql`
  {
    currentUser {
        name
    }
  }
`;

const SIGNIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email:$email, password:$password) {
        token
    }
  }
`;

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);

    //const { loading, error, data } = useQuery(CURRENT_USER);
    const [signIn] = useMutation(SIGNIN);

    async function onSubmit(e) {
        e.preventDefault();

        try {
            const { data } = await signIn({ variables: { email, password } });
            localStorage.setItem('token', data.signIn.token);
            setHasError(false);
        } catch (e) {
            setHasError(true);
        }
    }

    return (
        <Grid container
            spacing={0}
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}>
            <form onSubmit={onSubmit} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Endereço de e-mail"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={hasError}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={hasError}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Entrar
          </Button>
                <Grid container>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Não tem uma conta? Cadastre-se"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}

export default SignIn;