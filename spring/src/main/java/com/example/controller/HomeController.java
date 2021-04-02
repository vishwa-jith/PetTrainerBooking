package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.Dao.User;
import com.example.Dao.Message;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;
import org.springframework.dao.DataAccessException;

@RestController
@CrossOrigin()
public class HomeController {

	@Autowired
	JdbcTemplate jdbc;

	@GetMapping("/createUser")
	public String welcome() {
		String sql = "CREATE TABLE user (id VARCHAR(40) NOT NULL PRIMARY KEY, email VARCHAR(30) NOT NULL UNIQUE, password VARCHAR(30) NOT NULL, username VARCHAR(50) NOT NULL UNIQUE, mobileNumber VARCHAR(11), active BOOLEAN DEFAULT true, role VARCHAR(20) NOT NULL DEFAULT 'owner', shopName VARCHAR(20), experience INT(2))";
		jdbc.execute(sql);
		return "Welcome";
	}

	@PostMapping(value = "/signup")
	public Message signup(@RequestBody User user) {
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
		Message msg=new Message();
		if (userEmail.getEmail() != null) {
			msg.setMessage("User already exist with this email");
		} else if (userUsername.getUsername() != null) {
			msg.setMessage("User already exist with this username");
		} else {
			String query = "insert into user (id, username, email, password, mobileNumber) values ('"
					+ UUID.randomUUID() + "','" + user.getUsername() + "','" + user.getEmail() + "','"
					+ user.getPassword() + "','" + user.getMobileNumber() + "')";
			jdbc.update(query);
			msg.setMessage("Signup Successful");
		}
		return msg;
	}

	@PostMapping(value = "/login")
	public User login(@RequestBody User user) {
		User res = jdbc.query(
				"select id, email, username, mobileNumber, active, role, shopName, experience from user where email='"
						+ user.getEmail() + "';",
				new ResultSetExtractor<User>() {
					@Override
					public User extractData(ResultSet rs) throws SQLException, DataAccessException {
						User e = new User();
						while (rs.next()) {
							e.setId(rs.getString(1));
							e.setEmail(rs.getString(2));
							e.setUsername(rs.getString(3));
							e.setMobileNumber(rs.getString(4));
							e.setActive(rs.getBoolean(5));
							e.setRole(rs.getString(6));
							e.setShopName(rs.getString(7));
							e.setExperience(rs.getInt(8));
						}
						return e;
					}
				});
		User logUser = jdbc.query("select * from user where email='" + user.getEmail() + "';",
				new ResultSetExtractor<User>() {
					@Override
					public User extractData(ResultSet rs) throws SQLException, DataAccessException {
						User e = new User();
						while (rs.next()) {
							e.setEmail(rs.getString(2));
							e.setPassword(rs.getString(3));
						}
						return e;
					}
				});
		if (logUser.getEmail() == null) {
			res.setMessage("Not such account exist");
		} else if (logUser.getEmail().equals(user.getEmail()) && logUser.getPassword().equals(user.getPassword())) {
			res.setMessage("Login Successfull");
		} else {
			res.setMessage("Wrong username or password");
		}
		return res;
	}

	@GetMapping("/Admin")
	public List<User> getTrainers() {
		List<User> logUser = jdbc.query("select * from user where role='trainer';",
				new ResultSetExtractor<List<User>>() {
					@Override
					public List<User> extractData(ResultSet rs) throws SQLException, DataAccessException {
						List<User> list = new ArrayList<User>();
						while (rs.next()) {
							User e = new User();
							e.setId(rs.getString(1));
							e.setPassword(rs.getString(3));
							e.setUsername(rs.getString(4));
							e.setEmail(rs.getString(2));
							e.setMobileNumber(rs.getString(5));
							e.setShopName(rs.getString(8));
							e.setExperience(rs.getInt(9));
							list.add(e);
						}
						return list;
					}
				});
		return logUser;
	}

	@GetMapping("/Trainer")
	public List<User> getTrainersForTrainer() {
		List<User> logUser = jdbc.query("select * from user where role='trainer';",
				new ResultSetExtractor<List<User>>() {
					@Override
					public List<User> extractData(ResultSet rs) throws SQLException, DataAccessException {
						List<User> list = new ArrayList<User>();
						while (rs.next()) {
							User e = new User();
							e.setId(rs.getString(1));
							e.setUsername(rs.getString(4));
							e.setMobileNumber(rs.getString(5));
							e.setShopName(rs.getString(8));
							e.setExperience(rs.getInt(9));
							list.add(e);
						}
						return list;
					}
				});
		return logUser;
	}

	@PostMapping("/Admin/add")
	public Message addTrainer(@RequestBody User user) {
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

		Message msg = new Message();
		if (userEmail.getEmail() != null) {
			msg.setMessage("User already exist with this email");
		} else if (userUsername.getUsername() != null) {
			msg.setMessage("User already exist with this username");
		} else {
			String query = "insert into user (id, username, email, password, role, shopName, experience) values ('"
					+ UUID.randomUUID() + "','" + user.getUsername() + "','" + user.getEmail() + "','"
					+ user.getPassword() + "','" + user.getRole() + "','" + user.getShopName() + "',"
					+ user.getExperience() + ");";
			jdbc.update(query);
			msg.setMessage("Trainer Added Successfully");
		}
		return msg;
	}

	@DeleteMapping(value = "/Admin/remove/{id}")
	public Message removeTrainer(@PathVariable("id") String id) {
		String query = "delete from user where id='" + id + "';";
		jdbc.update(query);
		Message msg = new Message();
		msg.setMessage("Trainer removed Successfully");
		return msg;
	}

	@PutMapping(value = "/Admin/update/{id}")
	public Message updateTrainer(@PathVariable("id") String id, @RequestBody User user) {

		User logUserDetails = jdbc.query("select * from user where id='" + id + "';", new ResultSetExtractor<User>() {
			@Override
			public User extractData(ResultSet rs) throws SQLException, DataAccessException {
				User e = new User();
				while (rs.next()) {
					e.setUsername(rs.getString(4));
					e.setEmail(rs.getString(2));
				}
				return e;
			}
		});

		if (logUserDetails.getEmail() != user.getEmail()) {
			String emailQuery = "update user set email='" + user.getEmail() + "' where id='" + id + "';";
			jdbc.update(emailQuery);
		}

		if (logUserDetails.getUsername() != user.getUsername()) {
			String usernameQuery = "update user set username='" + user.getUsername() + "' where id='" + id + "';";
			jdbc.update(usernameQuery);
		}

		String query = "update user set password='" + user.getPassword() + "', shopName='" + user.getShopName()
				+ "', experience=" + user.getExperience() + "  where id='" + id + "';";
		jdbc.update(query);
		Message msg = new Message();
		msg.setMessage("Trainer Details Updated Successfully");
		return msg;
	}
}