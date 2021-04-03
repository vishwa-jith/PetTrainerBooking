package com.example.controller;

import com.example.JwtService;
import com.example.Dao.Booking;
import com.example.Dao.Message;
import com.example.Dao.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@RestController
@CrossOrigin
public class BookingController {

	@Autowired
	JdbcTemplate jdbc;
 
	@Autowired
	JwtService jwt;

	@GetMapping("/createBooking")
	public String welcome() {
		String sql = "CREATE TABLE booking (id VARCHAR(40), trainerId VARCHAR(40), lawFirmName VARCHAR(20), date TIMESTAMP, amount INT(9), bookingStatus VARCHAR(20), PRIMARY KEY (id, trainerId), CONSTRAINT FK_UserOrder FOREIGN KEY (trainerId) REFERENCES user(id))";
		jdbc.execute(sql);
		return "Welcome Booking";
	}

	@PostMapping("/booking")
	public ResponseEntity<?> addBooking(@RequestHeader("Authorization") String authToken,
			@RequestBody Booking booking) {
		String token = authToken.substring(7, authToken.length());
		User authUser = jwt.validateToken(token, "owner");
		if (authUser.getMessage() != null) {
			Message msg = new Message();
			msg.setMessage(authUser.getMessage());
			return ResponseEntity.ok(msg);
		}

		String query = "insert into booking (id, trainerId, lawFirmName, date, bookingStatus) values ('"
				+ authUser.getId() + "','" + booking.getTrainerId() + "','" + booking.getLawFirmName() + "','"
				+ booking.getDate() + "','" + booking.getBookingStatus() + "');";
		jdbc.update(query);
		Message msg = new Message();
		msg.setMessage("Booking added successfully");
		return ResponseEntity.ok(msg);
	}

	@PutMapping("/booking/{trainerId}")
	public ResponseEntity<?> updateBooking(@RequestHeader("Authorization") String authToken,
			@PathVariable("trainerId") String trainerId, @RequestBody Booking booking) {
		String token = authToken.substring(7, authToken.length());
		User authUser = jwt.validateToken(token, "owner");
		if (authUser.getMessage() != null) {
			Message msg = new Message();
			msg.setMessage(authUser.getMessage());
			return ResponseEntity.ok(msg);
		}

		String query = "update booking set date='" + booking.getDate() + "'where id='" + authUser.getId()
				+ "' AND trainerId='" + trainerId + "'";
		jdbc.update(query);
		Message msg = new Message();
		msg.setMessage("Booking updated successfully");
		return ResponseEntity.ok(msg);
	}

	@GetMapping("/Trainer/booking")
	public ResponseEntity<?> getBooking(@RequestHeader("Authorization") String authToken) {
		String token = authToken.substring(7, authToken.length());
		User authUser = jwt.validateToken(token, "trainer");
		if (authUser.getMessage() != null) {
			Message msg = new Message();
			msg.setMessage(authUser.getMessage());
			return ResponseEntity.ok(msg);
		}
		List<Booking> booking = jdbc
				.query("select id, lawFirmName, date, amount, bookingStatus from booking where trainerId='"
						+ authUser.getId() + "';", new ResultSetExtractor<List<Booking>>() {
							@Override
							public List<Booking> extractData(ResultSet rs) throws SQLException, DataAccessException {
								List<Booking> list = new ArrayList<Booking>();
								while (rs.next()) {
									Booking e = new Booking();

									User userUsername = jdbc.query(
											"select * from user where id='" + rs.getString(1) + "';",
											new ResultSetExtractor<User>() {
												@Override
												public User extractData(ResultSet rs)
														throws SQLException, DataAccessException {
													User e = new User();
													while (rs.next()) {
														e.setUsername(rs.getString(4));
													}
													return e;
												}
											});

									e.setId(rs.getString(1));
									e.setLawFirmName(rs.getString(2));
									e.setUsername(userUsername.getUsername());
									e.setDate(rs.getString(3));
									e.setAmount(rs.getInt(4));
									e.setBookingStatus(rs.getString(5));
									list.add(e);
								}
								return list;
							}
						});
		return ResponseEntity.ok(booking);
	}

	@GetMapping("/booking/{trainerId}")
	public ResponseEntity<?> getBookingWithId(@RequestHeader("Authorization") String authToken,
			@PathVariable("trainerId") String trainerId) {
		String token = authToken.substring(7, authToken.length());
		User authUser = jwt.validateToken(token, "owner");
		if (authUser.getMessage() != null) {
			Message msg = new Message();
			msg.setMessage(authUser.getMessage());
			return ResponseEntity.ok(msg);
		}
		Booking booking = jdbc.query(
				"select * from booking where id='" + authUser.getId() + "' AND trainerId='" + trainerId + "';",
				new ResultSetExtractor<Booking>() {
					@Override
					public Booking extractData(ResultSet rs) throws SQLException, DataAccessException {
						Booking e = new Booking();
						while (rs.next()) {

							User userUsername = jdbc.query("select * from user where id='" + rs.getString(1) + "';",
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

							e.setId(rs.getString(1));
							e.setTrainerId(rs.getString(2));
							e.setLawFirmName(rs.getString(3));
							e.setUsername(userUsername.getUsername());
							e.setDate(rs.getString(4));
							e.setAmount(rs.getInt(5));
							e.setBookingStatus(rs.getString(6));
						}
						return e;
					}
				});
		return ResponseEntity.ok(booking);
	}

	@CrossOrigin
	@PutMapping("/Trainer/booking/{id}")
	public ResponseEntity<?> updateBookingStatus(@RequestHeader("Authorization") String authToken,
			@PathVariable("id") String id, @RequestBody Booking booking) {
		String token = authToken.substring(7, authToken.length());
		User authUser = jwt.validateToken(token, "trainer");
		if (authUser.getMessage() != null) {
			Message msg = new Message();
			msg.setMessage(authUser.getMessage());
			return ResponseEntity.ok(msg);
		}
		String query = "update booking set bookingStatus='" + booking.getBookingStatus() + "' where id='" + id
				+ "'AND trainerId='" + authUser.getId() + "';";
		jdbc.update(query);
		if (booking.getBookingStatus().equals("accepted")) {
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
					"select * from booking where id='" + id + "'AND trainerId='" + authUser.getId() + "';",
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
			String addAppointmentQuery = "insert into appointment (id, userId, date, issuedBy) values ('"
					+ authUser.getId() + "','" + id + "','" + bookingDate.getDate() + "','"
					+ trainerUsername.getUsername() + "')";
			jdbc.update(addAppointmentQuery);

		}
		Message msg = new Message();
		msg.setMessage("Booking status updated successfully");
		return ResponseEntity.ok(msg);
	}

	@DeleteMapping("/booking/{id}/{trainerId}")
	public String removeBooking(@PathVariable("id") String id, @PathVariable("trainerId") String trainerId) {
		String query = "delete from booking where id='" + id + "'AND trainerId='" + trainerId + "';";
		jdbc.update(query);
		return "Booking deleted successfully";
	}
}