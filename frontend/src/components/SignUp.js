import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const SIGNUP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signUp(name:$name, email:$email, password:$password) {
        token
    }
  }
`;

function SignUp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [hasError, setHasError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const [signUp] = useMutation(SIGNUP);

    async function onSubmit(e) {
        e.preventDefault();

        try {
            const { data } = await signUp({ variables: { name, email, password } });
            localStorage.setItem('token', data.signUp.token);

            setHasError(false);

            props.client.link.subscriptionClient.close(false);

            setShowMessage(true);
        } catch (e) {
            setHasError(true);
        }
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Grid container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}>
                    {showMessage ? (
                        <div>
                            <Typography variant="h3" align="center">Conta criada com sucesso!</Typography>
                            <Typography variant="subtitle1" align="center">
                                <Link href="/" variant="body2">
                                    {"Entrar"}
                                </Link>
                            </Typography>
                        </div>
                    ) : (
                            <form onSubmit={onSubmit} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    error={hasError}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Endereço de e-mail"
                                    name="email"
                                    autoComplete="email"
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
                                    CADASTRAR
</Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/" variant="body2">
                                            {"Já possui uma conta? Entrar"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>

                        )}
                </Grid>
            </Container>
        </>
    )
}

/*
*/

export default withApollo(SignUp);