import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../../components/book';

class Books extends Component {

  render() {
    return (
      <div>
        <Book />
      </div>
    );
  }
}

export default Books;
