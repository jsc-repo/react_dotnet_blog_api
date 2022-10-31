import * as React from "react";
import { CardActionArea, Card, CardContent, Typography } from "@mui/material";

export default function BasicCard({ text, component, to }) {
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 275, textDecoration: "none" }}
      component={component}
      to={to}
    >
      <CardActionArea>
        <CardContent>
          {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {text}
          </Typography> */}
          <Typography variant="h5" component="div" align="center">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
