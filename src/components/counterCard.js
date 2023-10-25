import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useQuery, gql } from "@apollo/client";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../src/theme";

const GET_REIMBURSEMENTS = gql`
  query GetReimbursements {
    ireimbursements {
      _id
    }
  }
`;

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

const MyCounterCard = ({ title }) => {
  const classes = useStyles();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { loading, error, data } = useQuery(GET_REIMBURSEMENTS);

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const count = data.ireimbursements.length;

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
            color: colors.blueAccent[200],
            opacity: 1,
          }}
        >
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Count
        </Typography>
        <Typography variant="h2" component="p">
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyCounterCard;
