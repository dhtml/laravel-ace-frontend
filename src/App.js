import React, {useEffect, useState} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import Login from './components/login.component'
import Dashboard from './components/dashboard.component'
import Loading from "./components/loading.component";
import useToken from './useToken';
import configData from "./config.json";
import Customer from "./components/customer.component";

function App() {
    const [appState, setAppState] = useState({
        loading: false,
        customers: false,
        page: 0,
        current_page: 0,
    });


    const {token, setToken} = useToken();

    useEffect(() => {
        let page = appState.page;
        if(appState.loading) {return;}
        if(page===appState.current_page) {return;}
        setAppState({...appState, loading: true });
        const apiUrl = `${configData.API_URL}/customers?page=${page}`;
        fetch(apiUrl, {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((res) => res.json())
            .then((response) => {
                if(typeof(response.data)!=='undefined') {
                    setTimeout(()=>{
                        setAppState({...appState, loading: false, current_page: page, customers: response.data });
                    },500);
                }
            });
    }, [appState,token]);

    if (!token) {
        return <Login setToken={setToken}/>
    } else if(appState.page===0) {
        setAppState({ loading: false, page: 1});
    }

    if(appState.loading) {
        return <Loading/>
    }

    if(!appState.customers) {
        return;
    }


        const handleLogout = e => {
        return fetch(`${configData.API_URL}/logout`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((data) => {
                setToken(false);
            });
    }

    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={'/sign-in'}>
                            Laravel Ace
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarToggler">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    Hello Admin | <span className="link" onClick={handleLogout}>Logout</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <Routes>
                        <Route exact path="/" element={<Dashboard appState={appState} setAppState={setAppState} token={token}/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
