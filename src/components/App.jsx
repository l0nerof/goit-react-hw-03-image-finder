import { Modal } from './modal/Modal';
import { SearchBar } from './searchBar/SearchBar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Component } from 'react';

export class App extends Component {
  state = {
    showModal: false,
    inputValue: '',
    modalImg: '',
  };

  handleFormSubmit = inputValue => {
    this.setState({ inputValue });
  };

  toggleModal = largeImageURL => {
    this.setState(state => ({
      showModal: !state.showModal,
      modalImg: largeImageURL,
    }));
  };

  render() {
    const { showModal, inputValue, modalImg } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          inputValue={inputValue}
          showModal={this.toggleModal}
        ></ImageGallery>
        <div>
          {showModal && (
            <Modal onClose={this.toggleModal} modalImg={modalImg}></Modal>
          )}
        </div>
      </div>
    );
  }
}
