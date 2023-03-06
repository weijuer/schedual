import * as XLSX from 'xlsx'

export default function useExcel() {

    const exportExcel = () => {
        // 创建工作表
        const bookData = XLSX.utils.table_to_sheet(document.getElementsByClassName('n-data-table-table')[0])
        // 创建工作簿
        const wb = XLSX.utils.book_new()
        // 将工作表放入工作簿中
        XLSX.utils.book_append_sheet(wb, bookData, '当月排班表')
        // 生成文件并下载
        XLSX.writeFile(wb, 'test.xlsx')
    }

    return {
        exportExcel
    }
}