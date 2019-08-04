import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ProsConsTable from './components/ProsConsTable';

class Root extends Component {

    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/" component={ProsConsTable} />
                </Switch>
            </>
        );
    }
}

export default Root;