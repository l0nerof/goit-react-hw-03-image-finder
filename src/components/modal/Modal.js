import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape' || event.currentTarget === event.target) {
      console.log('esc');
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleKeyDown}>
        <div className={css.Modal}>
          <img src={this.props.modalImg} alt="img" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  modalImg: PropTypes.string,
};
