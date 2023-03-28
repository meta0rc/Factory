import {
  ContainerTable,
  HeaderTable,
  RowData,
  TabData,
  TabHead,
} from "./style";

export const Table = ({ rows, disableSelection }) => {
  return (
    <ContainerTable>
      <table>
        <thead>
          <HeaderTable>
            {!disableSelection && (
              <th>
                <input type="checkbox" />
              </th>
            )}
            {columns.map((column, i) => (
              <TabHead
                key={i}
                as="th"
                width={column.width}
              >
                {column.label}
              </TabHead>
            ))}
          </HeaderTable>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <>
              <RowData key={i}>
                {!disableSelection && (
                  <td className="checkbox-table">
                    <input type="checkbox" />
                  </td>
                )}
                {columns.map((column, i) => (
                  <TabData as="td" width={column.width}>
                    {row[column.field]
                      ? row[column.field]
                      : column.renderCell
                      ? column.renderCell(row)
                      : "-"}
                  </TabData>
                ))}
              </RowData>
            </>
          ))}
        </tbody>
        {/* {columns.map((column, id) => (
          <>
            {!disableSelection && <input type="checkbox" />}
            {rows.map((row) => (
              <RowData key={`tr-${id}`}>
                {Object.keys(row).map(
                  (item) => item == column.field && <td>Teste</td>
                )}
              </RowData>
            ))}
          </>
        ))} */}
      </table>
    </ContainerTable>
  );
};

const columns = [
  {
    width: "300px",
    field: "nome",
    label: "Nome",
    editable: false,
  },
  {
    width: "300px",

    field: "cargo",
    label: "Cargo",
    editable: false,
  },
  {
    width: "100px",
    field: "setor",
    label: "Setor",
    editable: false,
    renderCell: (row) => "Teste setor",
  },
  {
    width: "50px",
    field: "funcao",
    label: "Função",
    editable: false,
    renderCell: (row) => "Teste função",
  },
  {
    width: "300px",
    field: "unidade",
    label: "Unidade",
    editable: false,
  },
];
