import {
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { TableProps } from "./types";

export const TableMobile = <T,>({
  headers,
  actions,
  dataList,
  itemId,
  noResultsMessage,
}: TableProps<T>) => {
  const list = dataList?.data || [];
  const total = dataList?.meta?.total || 0;

  if (total === 0) {
    return <Typography>{noResultsMessage}</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {list?.map((data) => (
        <Grid size={{ xs: 12 }} key={itemId(data)}>
          <Paper
            sx={{
              p: 3,
              borderTop: ({ palette }) => `5px solid ${palette?.primary?.main}`,
              borderRadius: `0px 0px 8px 8px`,
            }}
          >
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
              <Box mt={1}>
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
