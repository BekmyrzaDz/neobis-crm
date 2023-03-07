import { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Button, makeStyles } from '@material-ui/core';
import user from '../../assets/user.svg';
import plus from '../../assets/plus.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '24px 0',
    '& .MuiPaper-elevation4': {
      boxShadow: 'none',
    },
  },
  toolbar: {
    backgroundColor: '#E5E5E5',
    color: '#252525',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#756FB3',
    borderRadius: '16px',
    marginRight: '16px',
    padding: '17px 18px',
    textTransform: 'none',
    fontSize: '16px',
    color: '#fff',
  },
  userName: {
    fontSize: '18px',
    marginLeft: '10px',
  },
}));

function Header() {
  const classes = useStyles();
  const [userName, setUserName] = useState<string>('Бексултан Маратов');

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Button className={classes.button} variant="contained">
            <img src={plus} alt="plus" style={{ marginRight: '13px' }} />
            Добавить сотрудника
          </Button>
          <Avatar alt={userName} src={user} />
          <Typography className={classes.userName} variant="subtitle1">
            {userName}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;