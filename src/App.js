import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyAHgwS25jP4y3Hr9Z2D-PPi7AYXLYKoAXI',
            authDomain: 'rn-auth-test-7e6c8.firebaseapp.com',
            databaseURL: 'https://rn-auth-test-7e6c8.firebaseio.com',
            projectId: 'rn-auth-test-7e6c8',
            storageBucket: 'rn-auth-test-7e6c8.appspot.com',
            messagingSenderId: '696008963685'
          };
        firebase.initializeApp(config);    
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (<CardSection> 
                            <Button onPress={() => firebase.auth().signOut()}> 
                                Log Out 
                            </Button> 
                        </CardSection>);
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;        
        }
    }

    render() {
        return (
            <View>
                <Header headerText='Firebase Authentication' />
                {this.renderContent()}            
            </View>            
        );
    }
}

export default App;
