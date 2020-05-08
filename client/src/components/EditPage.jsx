import React, { useState, useMemo, useCallback, useEffect } from 'react';

// components
import TextEditor from './TextEditor';

// types
import { HOME_PAGE } from '../actions/ContentIDs';

// react router
import { Link, Redirect } from 'react-router-dom';

// redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  createNewContent,
  getContentById,
  updateContentById,
} from '../actions/contentActions';

const EditPage = ({ isAuthenticated }) => {
  const [value, setValue] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const loadContent = async () => {
      const res = await getContentById(HOME_PAGE);

      const content = JSON.parse(res);
      setValue(content);
      setLoading(false);
    };
    loadContent();
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    updateContentById(HOME_PAGE, value);
  };
  if (!isAuthenticated && !isLoading) {
    return <Redirect to='/' />;
  }
  return (
    <div>{isLoading ? 'Loading...' : <TextEditor editedValue={value} />}</div>
  );
};

EditPage.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(EditPage);
