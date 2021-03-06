package com.example.controller;

import com.example.Dao.Appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.JwtService;
import com.example.Dao.Message;
import com.example.Dao.User;

import java.util.List;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@RestController
@CrossOrigin()
public class AppointmentController {

	@Autowired
	JdbcTemplate jdbc;

	@Autowired
	JwtService jwt;

	@GetMapping("/createAppointment")
	public String welcomeAppointment() {
		String sql = "CREATE TABLE appointment (id VARCHAR(40), userId VARCHAR(40), date TIMESTAMP, issuedBy VARCHAR(40), PRIMARY KEY (id, userId),  CONSTRAINT FK_AppointmentUserOrder FOREIGN KEY (userId) REFERENCES booking(id))";
		jdbc.execute(sql);
		return "Welcome Appointment";
	}

	@GetMapping("/Appointment")
	public ResponseEntity<?> getAppointments(@RequestHeader("Authorization") String authToken) {
		String token = authToken.substring(7, authToken.length());
		User authUser = jwt.validateToken(token, "owner");
		if (authUser.getMessage() != null) {
			Message msg = new Message();
			msg.setMessage(authUser.getMessage());
			return ResponseEntity.ok(msg);
		}
		List<Appointment> appointment = jdbc.query("select * from appointment where userId='" + authUser.getId() + "';",
				new ResultSetExtractor<List<Appointment>>() {
					@Override
					public List<Appointment> extractData(ResultSet rs) throws SQLException, DataAccessException {
						List<Appointment> list = new ArrayList<Appointment>();
						while (rs.next()) {
							Appointment e = new Appointment();
							e.setId(rs.getString(1));
							e.setDate(rs.getString(3));
							e.setIssuedBy(rs.getString(4));
							list.add(e);
						}
						return list;
					}
				});
		return ResponseEntity.ok(appointment);
	}

	@GetMapping("/Appointment/{userId}/{id}")
	public Appointment getAppointmentWithId(@PathVariable("userId") String userId, @PathVariable("id") String id) {
		Appointment appointment = jdbc.query(
				"select * from appointment where userId='" + userId + "'AND id='" + id + "';",
				new ResultSetExtractor<Appointment>() {
					@Override
					public Appointment extractData(ResultSet rs) throws SQLException, DataAccessException {

						Appointment e = new Appointment();
						while (rs.next()) {
							e.setId(rs.getString(1));
							e.setUserId(rs.getString(2));
							e.setDate(rs.getString(3));
							e.setIssuedBy(rs.getString(4));
						}
						return e;
					}
				});
		return appointment;
	}
}