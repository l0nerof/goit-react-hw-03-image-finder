import css from './Loader.module.css';
import { ThreeDots } from 'react-loader-spinner';
import { Component } from 'react';

export class Loader extends Component {
  render() {
    return (
      <div className={css.Loader}>
        <ThreeDots
          height="125"
          width="125"
          radius="9"
          color="#000"
          ariaLabel="three-dots-loading"
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }
}
