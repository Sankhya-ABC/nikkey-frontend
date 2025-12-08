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
  Typography,
} from "@mui/material";
import { TableProps } from "./types";

export const TableDesktop: React.FC<TableProps> = ({
  headers,
  actions,
  lists,
  noResultsMessage,
  itemId,
}) => {
  const { paginatedList } = lists;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="tabela de clientes">
          <TableHead>
            <TableRow>
              {headers?.map((header, index) =>
                header?.totalCustomElement ? (
                  header?.totalCustomElement
                ) : (
                  <Typography sx={{ ...header?.elementStyle }} key={index}>
                    <strong>{header?.text}: </strong>
                    {header?.value(header)}
                  </Typography>
                ),
              )}

              {headers?.map((header, index) => (
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    ...header?.elementStyle,
                  }}
                  key={index}
                  align={header?.columnAlignment}
                >
                  {header?.totalCustomElement
                    ? header?.totalCustomElement
                    : header?.text}
                </TableCell>
              ))}

              {actions?.length && (
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
            {paginatedList?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {noResultsMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedList?.map((data) => {
                return (
                  <TableRow key={itemId(data)} hover>
                    {headers?.map((header) => {
                      return <TableCell>{header?.value(data)}</TableCell>;
                    })}
                    {actions?.length && (
                      <TableCell align="center">
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
                                {typeof action?.element === "function"
                                  ? action?.element(data)
                                  : action?.element}
                              </IconButton>
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
