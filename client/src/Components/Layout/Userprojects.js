import React, { Fragment, useContext, useState, useEffect } from 'react';
import Userproject from './Userproject';
import './Userprojects.css';
import ProjectContext from '../../context/project/projectContext';

const Userprojects = (props) => {
  const { projects } = props;

  const projectContext = useContext(ProjectContext);

  const { addProject, clearCurrent, current, updateProject } = projectContext;

  useEffect(() => {
    if (current !== null) {
      console.log(current);
      setProject(current);
      console.log('success');
    } else {
      setProject({
        id: '',
        tags: '',
        name: '',
        description: '',
        url: '',
      });
    }
  }, [projectContext, current]);

  const [project, setProject] = useState({
    id: 'asdas',
    tags: 'asdas',
    name: 'asdasds',
    description: 'asdasd',
    url: 'asdasd',
  });

  const { id, tags, name, description, url } = project;

  const onChange = (e) =>
    setProject({ ...project, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addProject(project);
    } else {
      updateProject(project);
    }
    setProject({
      id: '',
      tags: '',
      name: '',
      description: '',
      url: '',
    });
  };

  const toggleproject = () => {
    var popup = document.getElementById('popup-projectfield');
    popup.classList.toggle('active');
  };

  const parent = () => {
    toggleproject();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Fragment>
      <div className='empty'></div>
      <input
        type='text'
        style={{
          display: 'block',
          width: '90%',
          margin: 'auto',
          borderBottom: '2px solid lightskyblue',
        }}
      />
      <i
        className='fas fa-plus-circle'
        style={{
          margin: '30px 0 0 5%',
          cursor: 'pointer',
          display: 'block',
          fontSize: '3em',
          width: '50px',
        }}
        onClick={toggleproject}
      ></i>

      <Userproject project={project} parent={parent} />

      {/* popup for edit project */}
      <div id='popup-projectfield'>
        <i className='fas fa-window-close' onClick={toggleproject}></i>
        <form className='profile-form2' onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='Project Title'
            name='name'
            value={name}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Enter Project Tags with , in between'
            name='tags'
            value={tags}
            onChange={onChange}
          />
          <input
            type='url'
            placeholder='Project GithubUrl'
            name='url'
            value={url}
            onChange={onChange}
          />
          <textarea
            className='desc'
            type='text'
            placeholder='Description'
            name='description'
            value={description}
            onChange={onChange}
          />
          <input type='submit' />
          {current && <button onClick={clearAll}>Clear</button>}
        </form>
      </div>
    </Fragment>
  );
};

export default Userprojects;
