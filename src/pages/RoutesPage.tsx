import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoutes } from '../reducers/routeReducer';
import { IRoute } from '../models/routeModel';
import { Button } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '12%',
      minWidth: 200,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);
const RoutesPage: React.FC = () => {
  const classes = useStyles();
  const routeList = useSelector((state: RootState) => state.route.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoutes());
  }, []);

  return (
    <div >
      <List
        className={classes.root}
        component="nav" aria-label="main mailbox folders">
          <Button variant="contained"  color="primary">New route</Button>
        {routeList?.map((route: IRoute) =>
          <ListItem key={route.id} button>

            <ListItemText primary={route.url} />
          </ListItem>
        )}

      </List>
    </div>
  );
}

export default RoutesPage;