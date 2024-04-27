import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getLogoFromLink } from '../../../util/frontend-urls';

class LinkItem extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
  };

  render() {
    const { link } = this.props;
    return (
      <a href={link}>
        <img
          src={getLogoFromLink(link)}
          alt='Placeholder'
          className='object-center'
          draggable='false'
        />
      </a>
    );
  }
}

export default LinkItem;
