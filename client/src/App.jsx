import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { Container, Box, CssBaseline } from '@mui/material'; // Importing MUI components

import Header from './components/Header';
import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
});

// Construct request middleware that will attach the JWT token to every request
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Main application component
function App() {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <Container component="main" sx={{ flex: 1, py: 2 }}>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<div>Dashboard</div>} /> {/* Placeholder for your dashboard */}
              <Route path="/" element={<div>Home</div>} /> {/* Placeholder for your home page */}
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Router>
    </ApolloProvider>
  );
}

export default App;
 
 
 
 
 
 
 
 
 
 
 
 
















































