import React, { Component } from 'react';
import { connect } from 'react-redux';
import querystring from 'query-string';
import { fetchBooks } from '../../actions/books';
import { NavLink } from 'react-router-dom'

import List from '../list';

class Book extends Component {
  state = {
    query: ''
  }

  componentDidMount() {          
    const { dispatch, query } = this.props;
    dispatch(fetchBooks(query));
  }

  render() {
    
    const { isFetching, books } = this.props;
       
    if (isFetching) {
      return (
        <p>Sæki Gögn..</p>
      );
    }
    
    return (
      <div>
        <List 
          title="Bækur" 
          data={books.items && (
            books.items.map((i) => (
              <div key={i.id} className="book__item">
                <NavLink
                  to={window.location + '/books/' + i.id}
                  className="navigation__link"
                ><h4>{i.title}</h4></NavLink>
                <p>Eftir {i.author}, gefin út {i.published}</p>
              </div>)))
          }
          />
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  
  return {
    isFetching: state.books.isFetching,
    books: state.books.books,
    error: state.books.error,
  }
}

export default connect(mapStateToProps)(Book);
