// @flow weak
/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles } from 'material-ui/styles';


const styleSheet = theme => ({
    container: {
      flexGrow: 1,
      position: 'relative',
      minHeight: 200,
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
      left: 0,
      right: 0,
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    textField: {
      width: '100%',
    },
  });

const renderInput = ({ classes, home, value, ref, ...other }) => (
    <TextField
    autoFocus={home}
    className={classes.textField}
    value={value}
    inputRef={ref}
    InputProps={{
      classes: {
        input: classes.input,
      },
      ...other,
    }}
  />
)

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight
            ? <span key={index} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            : <strong key={index} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>;
        })}
      </div>
    </MenuItem>
  );
}

const renderSuggestionsContainer = ({ containerProps, children }) => (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )

class IntegrationAutosuggest extends Component {
  state = {
    value: '',
    suggestions: [],
  };

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
  
    return inputLength === 0
      ? []
      : this.props.suggestions.filter(suggestion => {
          const keep =
            count < 5 && suggestion.toLowerCase().slice(0, inputLength) === inputValue;
  
          if (keep) {
            count += 1;
          }
  
          return keep;
        });
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: true,
          classes,
          placeholder: 'new label',
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

export default withStyles(styleSheet)(IntegrationAutosuggest);
