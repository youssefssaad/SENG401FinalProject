package com.example.WealthWave;

import com.example.WealthWave.authentication.dtos.User;
import com.example.WealthWave.expenseTracker.controller.ExpenseController;
import com.example.WealthWave.expenseTracker.model.Category;
import com.example.WealthWave.expenseTracker.model.Expense;
import com.example.WealthWave.expenseTracker.repository.ExpenseRepository;
import com.example.WealthWave.expenseTracker.service.ExpenseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ExpenseController.class)
public class ExpenseControllerTestSuite {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ExpenseService expenseService;
    Expense expenseOne;
    Expense expenseTwo;
    Category categoryOne;
    Category categoryTwo;
    User user;
    Date date;
    List<Expense> expenseList = new ArrayList<>();

    @BeforeEach
    void setUp(){
        user = new User("mohamed", "mohamed@gmail.com", "12345");
        date = new Date();

        categoryOne = new Category("C1", "Food", "Any food related expense");
        expenseOne = new Expense("E1",10.50, categoryOne, date, user);

        categoryTwo = new Category("C2", "Tuition", "U of C");
        expenseTwo = new Expense("E2",1000.55, categoryTwo, date, user);

        expenseList.add(expenseOne);
        expenseList.add(expenseTwo);
    }

    @AfterEach
    void tearDown(){

    }

    @Test
    void GetExpenseById_successTest() throws Exception {
        when(expenseService.getExpenseById("E1"))
                .thenReturn(expenseOne);
        this.mockMvc.perform(get("/api/expenses/E1"))
                .andDo(print()).andExpect(status().isOk());
    }

    @Test
    void GetExpenseById_NotFoundTest() throws Exception {
        when(expenseService.getExpenseById("E5"))
                .thenReturn(expenseOne);
        this.mockMvc.perform(get("/api/expenses/E1"))
                .andDo(print()).andExpect(status().isNotFound());
    }

    @Test
    void GetExpenseByCategoryTest() throws Exception {
        when(expenseService.getExpensesByCategory("C1"))
                .thenReturn((List<Expense>) expenseList);
        this.mockMvc.perform(get("/api/expenses/category/C1"))
                .andDo(print()).andExpect(status().isOk());
    }

    @Test
    void GetAllExpenseTest() throws Exception {
        when(expenseService.getAllExpenses())
                .thenReturn((List<Expense>) expenseList);
        this.mockMvc.perform(get("/api/expenses"))
                .andDo(print()).andExpect(status().isOk());
    }

    @Test
    void deleteExpense_successTest() throws Exception {
        when(expenseService.deleteExpense("E1"))
                .thenReturn(null);
        this.mockMvc.perform(delete("/api/expenses/remove/E1"))
                .andDo(print()).andExpect(status().isOk());
    }

    @Test
    void deleteExpense_NotFoundTest() throws Exception {
        when(expenseService.deleteExpense("E5"))
                .thenReturn(null);
        this.mockMvc.perform(delete("/api/expenses/remove/E1"))
                .andDo(print()).andExpect(status().isNotFound());
    }

    @Test
    void addExpenseTest() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(expenseOne);

        when(expenseService.addExpense(expenseOne, categoryOne.getId()))
                .thenReturn(expenseOne);
        this.mockMvc.perform(post("/api/expenses/add/C1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson))
                .andDo(print()).andExpect(status().isOk());

    }

    @Test
    void updateExpenseTest() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(expenseOne);

        when(expenseService.updateExistingExpense(expenseOne.getId(), expenseOne))
                .thenReturn(expenseOne);
        this.mockMvc.perform(put("/api/expenses/update/E1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andDo(print()).andExpect(status().isOk());

    }

}
