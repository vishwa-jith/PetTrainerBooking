package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.example.Dao.Report;
import com.example.Dao.Message;
import com.example.Dao.User;
import com.example.Dao.Booking;
import com.example.JwtService;

@RestController
@CrossOrigin()
public class ReportController {

    @Autowired
    JdbcTemplate jdbc;

    @Autowired
    JwtService jwt;

    @GetMapping("/createReport")
    public String welcomeReport() {
        String sql = "CREATE TABLE report (id VARCHAR(40) NOT NULL, appointmentId VARCHAR(40) NOT NULL, report VARCHAR(200), date TIMESTAMP, days int, issuedBy VARCHAR(40), PRIMARY KEY (id, appointmentId),  CONSTRAINT FK_ReportUserOrder FOREIGN KEY (appointmentId) REFERENCES appointment(id))";
        jdbc.execute(sql);
        return "Welcome Report";
    }

    @PostMapping(value = "/Trainer/report")
    public ResponseEntity<?> addReport(@RequestHeader("Authorization") String authToken, @RequestBody Report report) {
        String token = authToken.substring(7, authToken.length());
        User authUser = jwt.validateToken(token, "trainer");
        if (authUser.getMessage() != null) {
            Message msg = new Message();
            msg.setMessage(authUser.getMessage());
            return ResponseEntity.ok(msg);
        }
        User trainerUsername = jdbc.query("select * from user where id='" + authUser.getId() + "';",
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

        Booking bookingDate = jdbc.query(
                "select * from booking where id='" + report.getId() + "'AND trainerId='" + authUser.getId() + "';",
                new ResultSetExtractor<Booking>() {
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
                + "' AND trainerId='" + authUser.getId() + "';";
        jdbc.update(bookingAmount);

        String query = "insert into report (id, appointmentId, report, date, days, issuedBy) values ('" + report.getId()
                + "','" + authUser.getId() + "','" + report.getReport() + "','" + bookingDate.getDate() + "','"
                + report.getDays() + "','" + trainerUsername.getUsername() + "');";

        jdbc.update(query);
        Message msg = new Message();
        msg.setMessage("Report added Sucessfully");
        return ResponseEntity.ok(msg);
    }

    @PutMapping("/Trainer/report/{id}")
    public ResponseEntity<?> updateReport(@RequestHeader("Authorization") String authToken,
            @PathVariable("id") String id, @RequestBody Report report) {
        String token = authToken.substring(7, authToken.length());
        User authUser = jwt.validateToken(token, "trainer");
        if (authUser.getMessage() != null) {
            Message msg = new Message();
            msg.setMessage(authUser.getMessage());
            return ResponseEntity.ok(msg);
        }

        String bookingAmount = "update booking set amount=" + report.getAmount() + " WHERE id='" + id
                + "' AND trainerId='" + authUser.getId() + "';";
        jdbc.update(bookingAmount);

        String query = "update report set days='" + report.getDays() + "', report='" + report.getReport()
                + "'  where id='" + id + "' AND appointmentId='" + authUser.getId() + "'";
        jdbc.update(query);
        Message msg = new Message();
        msg.setMessage("Report updated successfully");
        return ResponseEntity.ok(msg);
    }

    @GetMapping("/checkupReport/{trainerId}")
    public ResponseEntity<?> checkupReport(@RequestHeader("Authorization") String authToken,
            @PathVariable("trainerId") String trainerId) {
        String token = authToken.substring(7, authToken.length());
        User authUser = jwt.validateToken(token, "owner");
        if (authUser.getMessage() != null) {
            Message msg = new Message();
            msg.setMessage(authUser.getMessage());
            return ResponseEntity.ok(msg);
        }
        Report report = jdbc.query(
                "select * from report where id='" + authUser.getId() + "' AND appointmentId='" + trainerId + "';",
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
        return ResponseEntity.ok(report);
    }

    @GetMapping("Trainer/checkupReport/{id}")
    public ResponseEntity<?> getReportForTrainer(@RequestHeader("Authorization") String authToken,
            @PathVariable("id") String id) {
        String token = authToken.substring(7, authToken.length());
        User authUser = jwt.validateToken(token, "trainer");
        if (authUser.getMessage() != null) {
            Message msg = new Message();
            msg.setMessage(authUser.getMessage());
            return ResponseEntity.ok(msg);
        }

        Report report = jdbc.query(
                "select * from report where id='" + id + "' AND appointmentId='" + authUser.getId() + "';",
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
        return ResponseEntity.ok(report);
    }
}