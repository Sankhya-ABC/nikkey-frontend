import {
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { TableProps } from "./types";

export const TableMobile: React.FC<TableProps> = ({
  headers,
  actions,
  lists,
  noResultsMessage,
  itemId,
}) => {
  const { paginatedList } = lists;

  if (paginatedList?.length === 0) {
    return <Typography>{noResultsMessage}</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {paginatedList?.map((data) => (
        <Grid item size={{ xs: 12 }} key={itemId(data)}>
          <Paper sx={{ p: 3 }}>
            {headers?.map((header, index) =>
              header?.totalCustomElement ? (
                header?.totalCustomElement
              ) : (
                <Typography sx={{ ...header?.elementStyle }} key={index}>
                  <strong>{header?.text}: </strong>
                  {header?.value(data)}
                </Typography>
              ),
            )}

            {actions && actions.length > 0 && (
              <Box>
                {actions?.map((action, index) => {
                  return (
                    <Tooltip
                      title={
                        typeof action?.tooltip === "function"
                          ? action?.tooltip(data)
                          : action?.tooltip
                      }
                      key={index}
                      arrow
                      placement="top"
                    >
                      {typeof action?.element === "function" ? (
                        (action?.element(data) as React.JSX.Element)
                      ) : (
                        <IconButton
                          onClick={
                            action?.onClick
                              ? () => action?.onClick!(data)
                              : undefined
                          }
                          disabled={
                            typeof action?.disabled === "function"
                              ? action?.disabled(data)
                              : action?.disabled
                          }
                        >
                          {action?.element}
                        </IconButton>
                      )}
                    </Tooltip>
                  );
                })}
              </Box>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
