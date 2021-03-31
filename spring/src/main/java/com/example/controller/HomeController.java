package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.Dao.User;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.dao.DataAccessException;
@RestController
public class HomeController {
	
	@Autowired
	JdbcTemplate jdbc;

	@Autowired
	JdbcTemplate jdbc;

	@GetMapping("/createUser")
	public String welcome() {
		String sql = "CREATE TABLE user (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, email VARCHAR(30) NOT NULL UNIQUE, password VARCHAR(30) NOT NULL, username VARCHAR(50) NOT NULL UNIQUE, mobileNumber VARCHAR(11), active BOOLEAN DEFAULT true, role VARCHAR(20) NOT NULL DEFAULT 'owner', shopName VARCHAR(20), experience INT(2))";
		jdbc.execute(sql);
		return "Welcome";
	}

	@PostMapping(value = "/signup")
	public String signup(@RequestBody User user) {
		User userEmail = jdbc.query("select * from user where email='" + user.getEmail() + "';",
				new ResultSetExtractor<User>() {
					@Override
					public User extractData(ResultSet rs) throws SQLException, DataAccessException {
						User e = new User();
						while (rs.next()) {
							e.setEmail(rs.getString(2));
						}
						return e;
					}
				});
		User userUsername = jdbc.query("select * from user where username='" + user.getUsername() + "';",
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
		if (userEmail.getEmail() != null) {
			return "User already exist with this email";
		} else if (userUsername.getUsername() != null) {
			return "User already exist with this username";
		} else {
			String query = "insert into user (username, email, password, mobileNumber) values ('" + user.getUsername()
					+ "','" + user.getEmail() + "','" + user.getPassword() + "','" + user.getMobileNumber() + "')";
			jdbc.update(query);
			return "Signup Successful";
		}
	}

	@PostMapping(value = "/login")
	public String login(@RequestBody User user) {
		User logUser = jdbc.query("select * from user where email='" + user.getEmail() + "';",
				new ResultSetExtractor<User>() {
					@Override
					public User extractData(ResultSet rs) throws SQLException, DataAccessException {

						User e = new User();
						while (rs.next()) {
							e.setId(rs.getInt(1));
							e.setEmail(rs.getString(2));
							e.setPassword(rs.getString(3));
						}
						return e;
					}
				});
		if (logUser.getEmail() == null) {
			return "Not such account exist";
		} else if (logUser.getEmail().equals(user.getEmail()) && logUser.getPassword().equals(user.getPassword())) {
			return "Login Successful";
		} else {
			return "Wrong username or password";
		}
	}
}