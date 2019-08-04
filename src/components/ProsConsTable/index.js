import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    consListSelector, consCountSelector,
    addCons, setCons, updateCons, deleteCons
} from '../../ducks/cons'
import {
    prosListSelector, prosCountSelector,
    addPros, setPros, updatePros, deletePros
} from '../../ducks/pros'

import ProsAndConsList from './ProsAndConsList';

class ProsConsTable extends Component {

    render() {
        const {
            addPros, updatePros, deletePros, addCons, updateCons, deleteCons,
            setPros, setCons, prosList, prosCount, consList, consCount
        } = this.props;

        return (
            <div className="pros-cons-table">
                <h1>Title</h1>
                <div className="table-container">
                    <div className="list-container pros-list">
                        <h2 className="pros-cons-headers pros-header">Pros</h2>
                        <ProsAndConsList
                            setNewList={setPros}
                            addToList={addPros}
                            updateList={updatePros}
                            deleteFromList={deletePros}
                            list={prosList}
                            count={prosCount}
                        />
                    </div>
                    <div className="list-container cons-list">
                        <h2 className="pros-cons-headers cons-header">Cons</h2>
                        <ProsAndConsList
                            setNewList={setCons}
                            addToList={addCons}
                            updateList={updateCons}
                            deleteFromList={deleteCons}
                            list={consList}
                            count={consCount}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    prosList: prosListSelector(state),
    prosCount: prosCountSelector(state),
    consList: consListSelector(state),
    consCount: consCountSelector(state),
}), { addPros, setPros, updatePros, deletePros, addCons, setCons, updateCons, deleteCons })(ProsConsTable);