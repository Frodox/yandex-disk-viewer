import { number, shape, string } from 'prop-types';

const fileMetaType = shape({
  name: string.isRequired,
  size: number,
  type: string.isRequired,
});

// eslint-disable-next-line import/prefer-default-export
export { fileMetaType };
