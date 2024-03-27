package com.example.WealthWave.util;

import com.example.WealthWave.expenseTracker.model.Budget;
import com.example.WealthWave.expenseTracker.model.Expense;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelUtil {

    public static String HEADER[] = {"id", "amount", "user", "category"};

    public static String SHEET_NAME = "ExpenseTable";

    public static ByteArrayInputStream dataToExcel(List<Expense> expenseList) throws IOException {
        Workbook workbook = new XSSFWorkbook();

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try {
            Sheet sheet = workbook.createSheet(SHEET_NAME);
            Row row = sheet.createRow(0);

            for (int i = 0; i < HEADER.length; i++) {
                Cell cell = row.createCell(i);
                cell.setCellValue(HEADER[i]);
            }

            int rowIndex = 1;
            for (Expense ex : expenseList) {
                Row row1 = sheet.createRow(rowIndex);
                rowIndex++;

                row1.createCell(0).setCellValue(ex.getId());
                row1.createCell(1).setCellValue(ex.getAmount());
                row1.createCell(2).setCellValue(ex.getUser().getUsername());
                row1.createCell(3).setCellValue(ex.getCategory().getName());
            }
            workbook.write(byteArrayOutputStream);
            return new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
        }catch(IOException e){
            throw new RuntimeException(e);
        }finally{
            workbook.close();
            byteArrayOutputStream.close();
        }
    }
}