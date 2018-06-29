import { func, shape, string } from 'prop-types';

const routerContextTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { routerContextTypes };
