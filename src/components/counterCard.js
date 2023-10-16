import React from "react";
// import { CounterCard } from '@mui-treasury/components/card/counter';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../src/theme";

const useStyles = makeStyles(() => ({
  card: {
    width: "300px", // adjust the width according to your layout
    borderRadius: 12,
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
    overflow: "hidden",
    position: "relative",
  },
  root: {
    minWidth: 275,
    maxWidth: 300,
    margin: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const MyCounterCard = ({ count, title, subtitle, color }) => {
  const classes = useStyles();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          style={{
            marginTop: 40,
            fontSize: 20,
            fontWeight: 600,
            // fontFamily: "Bebas Neue,sans-serif",
            // fontSize: "xxx-large",
            color: colors.blueAccent[200],
            opacity: 1,
          }}
        >
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Count
        </Typography>
        <Typography variant="h3" component="p">
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
  //   const classes = useStyles();

  //   return (
  //     <CounterCard
  //       classes={{ root: classes.card }}
  //       count={123} // adjust the count according to your requirement
  //       color={'#fff'} // adjust the color of the counter
  //       backgroundColor={'#3f51b5'} // adjust the background color
  //     />
  //   );
};

export default MyCounterCard;
