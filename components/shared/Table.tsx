import clsx from 'clsx';

const textAlignment = {
  right: 'text-right',
  left: 'text-left',
  center: 'text-center',
};

export type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  textAlign?: keyof typeof textAlignment;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
  idField: keyof Entry;
  displayMessage?: string;
  data: Entry[] | undefined;
  isLoading?: boolean;
  columns: TableColumn<Entry>[];
};

export const Table = <Entry extends unknown>({
  data,
  columns,
  idField,
  isLoading = false,
  displayMessage,
}: TableProps<Entry>) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80">
        <div>Loading...</div>
      </div>
    );
  }
  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80">
        {<div>{displayMessage || 'No entries found'}</div>}
      </div>
    );
  }
  return (
    <div className="flex flex-col mt-2">
      <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.title}
                  scope="col"
                  className={clsx(
                    'px-6 py-3 bg-gray-50 text-sm font-semibold text-gray-900',
                    column.textAlign ? textAlignment[column.textAlign] : 'text-left'
                  )}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((entry: any, entryIndex) => (
              <tr key={entry[idField] || entryIndex} className="bg-white">
                {columns.map(({ Cell, field, title, textAlign }, columnIndex) => (
                  <td
                    key={title + columnIndex}
                    className={clsx(
                      'px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500',
                      textAlign ? textAlignment[textAlign] : 'text-left'
                    )}
                  >
                    {Cell ? <Cell entry={entry} /> : entry[field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};