import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter({filter, onFilterHandle}) {
  return (
    <label className={s.label}>
      Write a name to find the contact:
      <input className={s.input} type='text' value={filter} name='filter' onChange ={onFilterHandle}>
      </input>
    </label>

  )
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterHandle: PropTypes.func.isRequired,

}

export default Filter

