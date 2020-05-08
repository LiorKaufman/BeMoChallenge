import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { css } from 'emotion';
// slate text editor
import { createEditor } from 'slate';
import {
  Slate,
  Editable,
  useSelected,
  useFocused,
  withReact,
} from 'slate-react';
import { getContentById } from '../actions/updateContent';
import { Link } from 'react-router-dom';
import { HOME_PAGE } from '../actions/ContentIDs';

import FeatureImg from '../resources/images/cda-interview-guide.jpg';

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
};

const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'image':
      return <ImageElement {...props} />;
    case 'block-quote':
      return (
        <blockquote {...attributes} style={{ backgroundColor: 'grey' }}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'link':
      return (
        <Link
          {...attributes}
          to={`${element.url}`}
          style={{ cursor: 'pointer', color: '#FF6600' }}
          className='links'
        >
          {children}
        </Link>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element.url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
          `}
        />
      </div>
      {children}
    </div>
  );
};

const Home = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const [value, setValue] = useState([]);
  useEffect(() => {
    const loadContent = async () => {
      const res = await getContentById(HOME_PAGE);

      const content = JSON.parse(res);
      setValue(content);
    };
    loadContent();
  }, []);

  return (
    <>
      <div id='feature' className='bghide'>
        <img
          src={FeatureImg}
          alt='feature image'
          id='feautreImg'
          style={{
            width: '100%',
          }}
        />
      </div>
      <section>
        <div id='padding'>
          <div className='stacks_in'>
            <div className='stacks_in'>
              <div className='stacks_in'>
                <Slate
                  editor={editor}
                  value={value}
                  onChange={(value) => setValue(value)}
                >
                  <Editable
                    readOnly
                    renderElement={(props) => <Element {...props} />}
                    renderLeaf={renderLeaf}
                  />
                </Slate>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
