import React, { Component } from 'react';

class Line extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            isEditing: false,
        }

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onChange(event) {
        this.setState({ value: event.target.value });
    }

    onSave() {
        const { value } = this.state;
        const { id } = this.props;

        if (value.length <= 30) {
            this.setState({ isEditing: false });
            this.props.onSave({ id, value });
        } else {
            alert('Maximum length: 30');
        }
    }

    onEdit() {
        this.setState({ isEditing: true });
    }

    render() {
        const { index } = this.props;
        const { value, isEditing } = this.state;

        return (
            <div className="line draggable" >
                {
                    isEditing ?
                        <input type="text" onChange={this.onChange} value={value} className="inputs" /> :
                        <span className="textbox">{`${index + 1}. ${value}`}</span>
                }
                {
                    isEditing ?
                        <input type="button" value="Save" onClick={this.onSave} className="buttons add-button" /> :
                        <input type="button" value="Edit" onClick={this.onEdit} className="buttons add-button" />
                }
            </div>
        );
    }
}

export default Line;