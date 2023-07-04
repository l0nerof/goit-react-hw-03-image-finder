import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/loader/Loader';
import { Button } from 'components/button/Button';
import { Component } from 'react';
import { fetchImageGallery } from 'Api/fetchImageGallery';

export class ImageGallery extends Component {
  state = {
    loading: false,
    photos: null,
    page: 1,
    isHiddenButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({ page: 1, photos: null }, () => {
        this.fetchImages();
      });
    }
  }

  fetchImages = () => {
    const { inputValue } = this.props;
    const { page } = this.state;

    this.setState({ loading: true });

    fetchImageGallery(inputValue, page)
      .then(({ hits, totalHits }) => {
        console.log(hits);
        if (hits.length === 0) {
          alert('Put more information');
          this.setState({ isHiddenButton: true });
        } else {
          this.setState(prevState => ({
            photos: prevState.photos ? [...prevState.photos, ...hits] : hits,
            isHiddenButton: 12 * page > totalHits,
            loading: false,
          }));
        }
      })
      .finally(() => this.setState({ loading: false }));
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      this.fetchImages
    );
  };

  render() {
    const { photos, loading, isHiddenButton } = this.state;

    return (
      <div>
        {photos && (
          <ul className={css.ImageGallery}>
            {photos.map(photo => (
              <ImageGalleryItem
                key={photo.id}
                smallImg={photo.webformatURL}
                alt={photo.tags}
                showModal={() => this.props.showModal(photo.largeImageURL)}
              />
            ))}
          </ul>
        )}
        {loading && <Loader />}
        {photos && !isHiddenButton && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  inputValue: PropTypes.string,
};
