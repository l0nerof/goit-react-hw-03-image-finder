import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/loader/Loader';
import { Button } from 'components/button/Button';
import { Component } from 'react';

export class ImageGallery extends Component {
  state = {
    loading: false,
    photos: null,
    page: 1,
    isHiddenButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({
        loading: true,
        photos: null,
        page: 1,
        isHiddenButton: false,
      });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${this.props.inputValue}&page=${this.state.page}&key=35821051-ff4ed7cb6cca304ad1608b196&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(res => res.json())
          .then(({ hits, totalHits }) => {
            console.log(hits);
            if (hits.length === 0) {
              alert('Put more information');
              this.setState({ isHiddenButton: true });
            } else this.setState({ photos: hits });
            if (12 * this.state.page > totalHits) {
              this.setState({ isHiddenButton: true });
            }
          })
          .finally(() => this.setState({ loading: false }));
      });
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
      isHiddenButton: false,
    }));

    setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?q=${this.props.inputValue}&page=${this.state.page}&key=35821051-ff4ed7cb6cca304ad1608b196&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(({ hits, totalHits }) => {
          console.log(hits);
          if (hits.length === 0) {
            alert('Put more information');
            this.setState({ isHiddenButton: true });
          } else
            this.setState(prevState => ({
              photos: [...prevState.photos, ...hits],
            }));
          if (12 * this.state.page > totalHits) {
            this.setState({ isHiddenButton: true });
          }
        })
        .finally(() => this.setState({ loading: false }));
    });
  };

  render() {
    return (
      <div>
        {this.state.photos && (
          <ul className={css.ImageGallery}>
            {this.state.photos.map(photo => {
              return (
                <ImageGalleryItem
                  key={photo.id}
                  smallImg={photo.webformatURL}
                  alt={photo.tags}
                  showModal={() => this.props.showModal(photo.largeImageURL)}
                />
              );
            })}
          </ul>
        )}
        {this.state.loading && <Loader></Loader>}
        {this.state.photos && !this.state.isHiddenButton && (
          <Button loadMore={() => this.loadMore()}></Button>
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  inputValue: PropTypes.string,
};
