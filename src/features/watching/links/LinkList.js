import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkItem from './LinkItem';

class LinkList extends Component {
  static propTypes = {
    links: PropTypes.array.isRequired,
  };

  render() {
    const { links } = this.props;

    if (links.length === 0) return <></>;

    return (
      <div className='mt-1 flex space-x-3'>
        {links.map((link, i) => (
          <LinkItem key={i} link={link}></LinkItem>
        ))}
      </div>
    );
  }
}

export default LinkList;
