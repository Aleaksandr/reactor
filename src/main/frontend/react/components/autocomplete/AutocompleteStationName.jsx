import React from 'react';
import Select from 'react-select';

const AutocompleteStationName = React.createClass({
    displayName: 'AutocompleteStationName',
    propTypes: {
        label: React.PropTypes.string,
    },
    getInitialState () {
        return {
            backspaceRemoves: true,
            multi: false
        };
    },
    onChange (value) {
        this.setState({
            value: value,
        });
    },

    getNames (input) {
        if (!input || input.length < 2) {
            return Promise.resolve({ options: [] });
        }
        return fetch('/train/getTrainStationNames?q='+input, {
            method: 'POST',
            credentials: 'include'})
            .then(response => {
                if (response.ok) {
                    console.log("OK Names");
                    return response.json();
                } else {
                    console.log("not found Train Station");
                }
            }).then(result => {
                return { options: result.items };

            }).catch(error => {
                console.log('Error load Names Station', error);
            });
    },

    render () {
        const AsyncComponent = Select.Async;

        return (
            <div className="input_text_auto">
                <AsyncComponent multi={this.state.multi}
                                value={this.state.value}
                                onChange={this.onChange}
                                valueKey="name" labelKey="name"
                                loadOptions={this.getNames}
                                backspaceRemoves={true} />
            </div>
        );
    }
});

module.exports = AutocompleteStationName;