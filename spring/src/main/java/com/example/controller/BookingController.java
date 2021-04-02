package com.example.controller;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.dao.DataAccessException;
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

	@GetMapping("/createBooking")
	public String welcome() {
		String sql = "CREATE TABLE booking (id VARCHAR(40), trainerId VARCHAR(40), lawFirmName VARCHAR(20), date TIMESTAMP, amount INT(9), bookingStatus VARCHAR(20), PRIMARY KEY (id, trainerId), CONSTRAINT FK_UserOrder FOREIGN KEY (trainerId) REFERENCES user(id))";
		jdbc.execute(sql);
		return "Welcome Booking";
	}

	@PostMapping("/booking")
	public Message addBooking(@RequestBody Booking booking) {
		String query = "insert into booking (id, trainerId, lawFirmName, date, bookingStatus) values ('"
				+ booking.getId() + "','" + booking.getTrainerId() + "','" + booking.getLawFirmName() + "','"
				+ booking.getDate() + "','" + booking.getBookingStatus() + "');";
		jdbc.update(query);
		Message msg = new Message();
		msg.setMessage("Booking added successfully");
		return msg;
	}

	@GetMapping("/Trainer/booking/{id}")
	public List<Booking> getBooking(@PathVariable("id") String id) {
		List<Booking> booking = jdbc.query(
				"select id, lawFirmName, date, amount, bookingStatus from booking where trainerId='" + id + "';",
				new ResultSetExtractor<List<Booking>>() {
					@Override
					public List<Booking> extractData(ResultSet rs) throws SQLException, DataAccessException {
						List<Booking> list = new ArrayList<Booking>();
						while (rs.next()) {
							Booking e = new Booking();

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
		return booking;
	}

	@GetMapping("/booking/{id}/{trainerId}")
	public Booking getBookingWithId(@PathVariable("id") String id, @PathVariable("trainerId") String trainerId) {
		Booking booking = jdbc.query("select * from booking where id='" + id + "' AND trainerId='" + trainerId + "';",
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
		return booking;
	}

	@CrossOrigin
	@PutMapping("/Trainer/booking/{id}/{trainerId}")
	public Message updateBookingStatus(@PathVariable("id") String id, @PathVariable("trainerId") String trainerId,
			@RequestBody Booking booking) {
		String query = "update booking set bookingStatus='" + booking.getBookingStatus() + "' where id='" + id
				+ "'AND trainerId='" + trainerId + "';";
		jdbc.update(query);
		if (booking.getBookingStatus().equals("accepted")) {
			User trainerUsername = jdbc.query("select * from user where id='" + trainerId + "';",
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
					"select * from booking where id='" + id + "'AND trainerId='" + trainerId + "';",
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
			String addAppointmentQuery = "insert into appointment (id, userId, date, issuedBy) values ('" + trainerId
					+ "','" + id + "','" + bookingDate.getDate() + "','" + trainerUsername.getUsername() + "')";
			jdbc.update(addAppointmentQuery);

		}
		Message msg = new Message();
		msg.setMessage("Booking status updated successfully");
		return msg;
	}

	@DeleteMapping("/booking/{id}/{trainerId}")
	public String removeBooking(@PathVariable("id") String id, @PathVariable("trainerId") String trainerId) {
		String query = "delete from booking where id='" + id + "'AND trainerId='" + trainerId + "';";
		jdbc.update(query);
		return "Booking deleted successfully";
	}
}