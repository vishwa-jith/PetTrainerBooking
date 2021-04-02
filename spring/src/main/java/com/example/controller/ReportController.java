package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.example.Dao.Report;
import com.example.Dao.Message;
import com.example.Dao.User;
import com.example.Dao.Booking;

@RestController
@CrossOrigin()
public class ReportController {

    @Autowired
    JdbcTemplate jdbc;

    @GetMapping("/createReport")
    public String welcomeReport() {
        String sql = "CREATE TABLE report (id VARCHAR(40) NOT NULL, appointmentId VARCHAR(40) NOT NULL, report VARCHAR(200), date TIMESTAMP, days int, issuedBy VARCHAR(40), PRIMARY KEY (id, appointmentId),  CONSTRAINT FK_ReportUserOrder FOREIGN KEY (appointmentId) REFERENCES appointment(id))";
        jdbc.execute(sql);
        return "Welcome Report";
    }

    @PostMapping(value = "/Trainer/report")
    public Message addReport(@RequestBody Report report) {
        User trainerUsername = jdbc.query("select * from user where id='" + report.getAppointmentId() + "';",
                new ResultSetExtractor<User>() {
                    @Override
                    public User extractData(ResultSet rs) throws SQLException, DataAccessException {
                        User e = new User();
                        while (rs.next()) {
                            e.setUsername(rs.getString(4));
                        }
                        return e;
                    }
                });

        Booking bookingDate = jdbc.query("select * from booking where id='" + report.getId() + "'AND trainerId='"
                + report.getAppointmentId() + "';", new ResultSetExtractor<Booking>() {
                    @Override
                    public Booking extractData(ResultSet rs) throws SQLException, DataAccessException {
                        Booking e = new Booking();
                        while (rs.next()) {
                            e.setDate(rs.getString(4));
                        }
                        return e;
                    }
                });

        String bookingAmount = "update booking set amount=" + report.getAmount() + " WHERE id='" + report.getId()
                + "' AND trainerId='" + report.getAppointmentId() + "';";
        jdbc.update(bookingAmount);

        String query = "insert into report (id, appointmentId, report, date, days, issuedBy) values ('" + report.getId()
                + "','" + report.getAppointmentId() + "','" + report.getReport() + "','" + bookingDate.getDate() + "','"
                + report.getDays() + "','" + trainerUsername.getUsername() + "');";

        jdbc.update(query);
        Message msg = new Message();
        msg.setMessage("Report added Sucessfully");
        return msg;
    }

    @GetMapping("/checkupReport/{id}/{trainerId}")
    public Report checkupReport(@PathVariable("id") String id, @PathVariable("trainerId") String trainerId) {
        Report report = jdbc.query("select * from report where id='" + id + "' AND appointmentId='" + trainerId + "';",
                new ResultSetExtractor<Report>() {
                    @Override
                    public Report extractData(ResultSet rs) throws SQLException, DataAccessException {
                        Report e = new Report();
                        while (rs.next()) {
                            e.setId(rs.getString(1));
                            e.setAppointmentId(rs.getString(2));
                            e.setReport(rs.getString(3));
                            e.setDate(rs.getString(4));
                            e.setDays(rs.getInt(5));
                            e.setIssuedBy(rs.getString(6));
                        }
                        return e;
                    }
                });

        Booking bookingAmount = jdbc.query("select * from booking where id='" + report.getId() + "'AND trainerId='"
                + report.getAppointmentId() + "';", new ResultSetExtractor<Booking>() {
                    @Override
                    public Booking extractData(ResultSet rs) throws SQLException, DataAccessException {
                        Booking e = new Booking();
                        while (rs.next()) {
                            e.setAmount(rs.getInt(5));
                        }
                        return e;
                    }
                });
        report.setAmount(bookingAmount.getAmount());
        return report;
    }
}