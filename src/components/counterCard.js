import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../../src/theme";

const useStyles = makeStyles(() => ({
  card: {
    width: "300px",
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

const MyCounterCard = ({ count, title, subTitle }) => {
  console.log("🚀 ~ file: counterCard.js:33 ~ MyCounterCard ~ count:", count);
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
            marginTop: 10,
            fontSize: 20,
            fontWeight: 600,
            color: colors.blueAccent[200],
            opacity: 1,
            marginBottom:30,
          }}
        >
          {title}
        </Typography>
        {subTitle && (
          <Typography className={classes.pos} color="textSecondary">
            {subTitle}
          </Typography>
        )}
        <Typography variant="h2" component="p">
          {count ?? 0}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyCounterCard;
