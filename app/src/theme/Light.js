import { createMuiTheme } from 'material-ui/styles';
import amber from 'material-ui/colors/amber';

const theme = createMuiTheme({
  palette: {
    primary: amber,
    contrastText: '#fff',
  },
});

export default theme;
