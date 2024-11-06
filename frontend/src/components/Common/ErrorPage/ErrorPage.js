import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ErrorPage.module.css';

const ErrorPage = ({
  number = 404,
  what = 'page not found',
  description = "We can't seem to find the page you're looking for!"
}) => {
  return (
    <div className={classes.Container}>
      <p className={classes.ErrorType}>
        <span className={classes.Yellow}>ERROR</span>
        {number}
        <span className={classes.Yellow}>.</span>
      </p>
      <p className={classes.PageNotFound}>{what}</p>
      <p className={classes.Description}>
        <span className={[classes.Yellow, classes.Bold].join(' ')}>
          OOPS!
        </span>{' '}
        {description}
      </p>
      <Link to="/">
        <button className={classes.Button}>Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;