import PropTypes from 'prop-types';
import css from './Button.module.css';
import { Component } from 'react';

export class Button extends Component {
  render() {
    return (
      <div className={css.Wrapper}>
        <button
          type="button"
          className={css.Button}
          onClick={this.props.loadMore}
        >
          Load more
        </button>
      </div>
    );
  }
}
