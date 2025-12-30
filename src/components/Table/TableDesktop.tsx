import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import { TableProps } from "./types";

export const TableDesktop = <T,>({
  headers,
  actions,
  dataList,
  itemId,
  noResultsMessage,
}: TableProps<T>) => {
  const list = dataList?.data || [];
  const total = dataList?.meta?.total || 0;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="tabela de clientes">
          <TableHead>
            <TableRow>
              {headers?.map((header, headerIndex) => (
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    ...header?.elementStyle,
                  }}
                  key={`column-${headerIndex}`}
                  align={header?.columnAlignment}
                >
                  {header?.totalCustomElement
                    ? header?.totalCustomElement
                    : header?.text}
                </TableCell>
              ))}

              {actions && actions.length > 0 && (
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                  }}
                />
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {total === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {noResultsMessage}
                </TableCell>
              </TableRow>
            ) : (
              list?.map((data) => {
                return (
                  <TableRow key={`row-${itemId(data)}`} hover>
                    {headers?.map((header, cellIndex) => {
                      return (
                        <TableCell key={`cell-${itemId(data)}-${cellIndex}`}>
                          {header?.value(data)}
                        </TableCell>
                      );
                    })}
                    {actions && actions.length > 0 && (
                      <TableCell align="center">
                        {actions?.map((action, actionIndex) => {
                          return (
                            <Tooltip
                              title={
                                typeof action?.tooltip === "function"
                                  ? action?.tooltip(data)
                                  : action?.tooltip
                              }
                              key={`actions-${itemId(data)}-${actionIndex}`}
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
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
