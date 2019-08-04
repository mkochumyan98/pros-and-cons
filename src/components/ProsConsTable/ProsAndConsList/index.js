import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Line from '../Line';

class ProsAndConsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isEditing: false,
        }

        this.onDragEnd = this.onDragEnd.bind(this);
        this.reorder = this.reorder.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addToList = this.addToList.bind(this);
    }

    onChange(event) {
        this.setState({ value: event.target.value });
    }

    reorder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    onDragEnd(result) {
        if (!result.destination) return;

        const items = this.reorder(
            this.props.list,
            result.source.index,
            result.destination.index
        );

        this.props.setNewList(items);
    }

    onSave(pros) {
        if (pros.value) {
            this.props.updateList(pros);
        } else {
            this.props.deleteFromList(pros);
        }
    }

    addToList() {
        const { value } = this.state;

        if (value && value.length <= 30) {
            this.props.addToList(value);
            this.setState({ value: '' });
        } else {
            alert(!value ? 'Please, fill the field' : 'Maximum length: 30');
        }
    }

    render() {
        const { value } = this.state;
        const { list, count } = this.props;

        return (
            <div className="pros-cons-section">
                <span>{`Total: ${count}`}</span>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {
                            provided => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="draggable-parent">
                                    {
                                        list.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {
                                                    provided => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Line
                                                                value={item.value}
                                                                id={item.id}
                                                                index={index}
                                                                onSave={this.onSave}
                                                                key={item.id}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </Draggable>
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>
                <div className="line">
                    <input type="text" onChange={this.onChange} value={value} className="inputs" />
                    <input type="button" onClick={this.addToList} value="Add" className="buttons add-button" />
                </div>
            </div>
        );
    }
}

export default ProsAndConsList;