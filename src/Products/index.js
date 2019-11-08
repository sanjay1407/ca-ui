import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { createMuiTheme } from "@material-ui/core";
import mockData from "./data";

const useStyles = createMuiTheme(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: "flex",
    alignItems: "center"
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

const Products = props => {
  const { className, ...rest } = props;

  const classes = useStyles;

  const [products] = useState(mockData);
  let history = useHistory();
  const handleClick = () => {
    history.push("/compare");
  };

  const getDifference = (basePrice = 0, price) => {
    const priceDifference = price - basePrice;
    const differencePercentage = basePrice
      ? (priceDifference * 100) / basePrice
      : 100;
    return `${parseFloat(differencePercentage).toFixed(2)}`;
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Products Comparison List" />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Site</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Their's price</TableCell>
                <TableCell>Our's price</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Difference ( % )
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(({ title, basePrice, price, id, site }) => (
                <TableRow hover key={id} onClick={handleClick}>
                  <TableCell>{site}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{price}</TableCell>
                  <TableCell>{basePrice}</TableCell>
                  <TableCell>{getDifference(basePrice, price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

Products.propTypes = {
  className: PropTypes.string
};

export default Products;
