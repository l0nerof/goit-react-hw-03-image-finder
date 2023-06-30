import css from './SearchBar.module.css';
import { Component } from 'react';

export class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  handleInputValueChange = event => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.inputValue.trim() === '') {
      alert('Put more informartion');
      return;
    }

    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.Form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.FormButton}>
            <span className={css.FormButtonLabel}>Search</span>
          </button>

          <input
            className={css.FormInput}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.inputValue}
            onChange={this.handleInputValueChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
