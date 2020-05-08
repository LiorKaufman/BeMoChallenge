import React, { useState, useEffect } from 'react';

// components
import TextEditor from './TextEditor';

// types
import { HOME_PAGE } from '../actions/ContentIDs';

// react router
import { Redirect, useHistory } from 'react-router-dom';

// redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getContent } from '../actions/contentActions';

const EditPage = ({ isAuthenticated }) => {
  let history = useHistory();
  const [pages, setPages] = useState([
    {
      label: 'Home Page',
      value: HOME_PAGE,
    },
  ]);

  const [editedID, setEditedID] = useState(HOME_PAGE);

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const loadContentIds = async () => {
      setLoading(true);
      const res = await getContent();
      const idArray = res.map((ele, index) => ({
        label: `Page number ${index + 1}`,
        value: ele._id,
      }));
      setPages(idArray);
      setEditedID(idArray[0].value);
      setLoading(false);
    };
    loadContentIds();
  }, []);

  const changeContent = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(e.currentTarget.value);
    setEditedID(e.currentTarget.value);
    setLoading(false);
  };

  if (!isAuthenticated && !isLoading) {
    return <Redirect to='/' />;
  }
  return (
    <div>
      <select
        className='page-selector'
        value={editedID}
        onChange={(e) => changeContent(e)}
      >
        {pages.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className='page-editor'>
        {isLoading ? 'Loading...' : <TextEditor editedID={editedID} />}
      </div>
    </div>
  );
};

EditPage.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(EditPage);
