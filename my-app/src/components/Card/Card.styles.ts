import { makeStyles } from '@mui/styles';
import { createStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      padding: '16px',
    },
    // NEW: Style for the calendar button, aligning it right
    scheduleButton: {
      marginLeft: 'auto',
    }
  }),
);

export default useStyles;