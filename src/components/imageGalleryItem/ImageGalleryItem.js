import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.ImageGalleryItem} onClick={this.props.showModal}>
        <img
          src={this.props.smallImg}
          alt={this.props.alt}
          className={css.ImageGalleryItemImage}
        />
      </li>
    );
  }
}
