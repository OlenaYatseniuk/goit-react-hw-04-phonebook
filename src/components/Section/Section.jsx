import React from 'react'
import PropTypes from 'prop-types'
import s from './Section.module.css';

function Section({children, title}) {
  return (
    <section className={s.section}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  )
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,

}

export default Section;
