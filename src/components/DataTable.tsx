import React from 'react';
interface Column<T> {
    key: keyof T;
    title: string;
    index: number;
}

interface DataTableProps<T> {
	data: T[];
	columns: Column<T>[];
	loading?: boolean;
	selectable?: boolean;
	onRowSelect?: (selectedRows: T[]) => void;
	// New props
	onColumnChange?: (columns: Column<T>[]) => void;
	onDataChange?: (data: T[]) => void;
	onLoadingChange?: (loading: boolean) => void;
	onSelectableChange?: (selectable: boolean) => void;
	onRowSelectChange?: (onRowSelect: (selectedRows: T[]) => void) => void;
}

const DataTable = <T,>({ tableProps }: { tableProps: DataTableProps<T> }) => {
	const {
		data,
		columns,
		loading,
		selectable,
		onRowSelect,
		onRowSelectChange,
	} = tableProps;

	const [selectedRows, setSelectedRows] = React.useState<T[]>([]);

	const handleRowClick = (row: T) => {
		if (selectable) {
			let newSelectedRows;
			if (selectedRows.includes(row)) {
				newSelectedRows = selectedRows.filter(r => r !== row);
			} else {
				newSelectedRows = [...selectedRows, row];
			}
			setSelectedRows(newSelectedRows);
			if (onRowSelect) onRowSelect(newSelectedRows);
			if (onRowSelectChange) onRowSelectChange(onRowSelect!);
		}
	};

	/*const handleLoadingToggle = () => {
		if (onLoadingChange) onLoadingChange(!loading);
	};

	const handleSelectableToggle = () => {
		if (onSelectableChange) onSelectableChange(!selectable);
	};

	// For demonstration, simple column and data editing
	const handleColumnEdit = () => {
		if (onColumnChange) {
			const newColumns = [...columns];
			if (newColumns.length > 0) {
				newColumns[0].title = 'Edited Title';
			}
			onColumnChange(newColumns);
		}
	};

	const handleDataEdit = () => {
		if (onDataChange) {
			const newData = [...data];
			if (newData.length > 0 && columns.length > 1) {
				(newData[0] as any)[columns[1].key] = 'Edited Name';
			}
			onDataChange(newData);
		}
	};*/

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-gray-200 dark:bg-gray-800">
				<thead>
					<tr className="bg-gray-200 dark:bg-gray-700">
						{columns.map((column) => (
							<th key={String(column.key)} className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200" scope="col">
								{column.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td colSpan={columns.length} className="text-center py-4">Loading...</td>
						</tr>
					) : data.length === 0 ? (
						<tr>
							<td colSpan={columns.length} className="text-center py-4">No data available</td>
						</tr>
					) : (
						data.map((row, index) => (
							<tr
								key={index}
								className={`border-b dark:border-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors dark:hover:bg-gray-700 ${selectable && selectedRows.includes(row) ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
								onClick={() => handleRowClick(row)}
								style={{ cursor: selectable ? 'pointer' : 'default' }}
							>
								{columns.map((column) => (
									<td key={String(column.key)} className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
										{String(row[column.key])}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default DataTable;