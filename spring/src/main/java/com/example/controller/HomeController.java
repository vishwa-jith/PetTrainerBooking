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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.example.Dao.User;
import com.example.Dao.Message;
import com.example.Dao.Jwt;
import com.example.JwtService;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin()
public class HomeController {

	@Autowired
	JdbcTemplate jdbc;

	@Autowired
	JwtService jwt;

	@Autowired
	private JavaMailSender javaMailSender;

	@GetMapping("/createUser")
	public String welcome() {
		String sql = "CREATE TABLE user (id VARCHAR(40) NOT NULL PRIMARY KEY, email VARCHAR(30) NOT NULL UNIQUE, password VARCHAR(30) NOT NULL, username VARCHAR(50) NOT NULL UNIQUE, mobileNumber VARCHAR(11), active BOOLEAN DEFAULT true, role VARCHAR(20) NOT NULL DEFAULT 'owner', shopName VARCHAR(40), experience INT(2), profileUrl VARCHAR(300), otp INT)";
		jdbc.execute(sql);
		jdbc.update(
				"insert into user (id, username, email, password, role) values ('c8f4a036-1809-4207-aa6e-638e5ab326df','admin','admin@gmail.com','password','admin')");
		jdbc.update(
				"insert into user (id, username, email, password, mobileNumber) values ('79617a02-dc5d-4a6c-a39f-9f12fe0ee6c3','Kishore Kumar','kishore1432@gmail.com','password','9876543210')");
		jdbc.update(
				"insert into user (id, username, email, password, mobileNumber) values ('988de637-4112-4958-8e46-531428250d84','Vishwa','vishwas32@gmail.com','password','9876543210')");
		jdbc.update(
				"insert into user (id, username, email, password, mobileNumber) values ('2e92f6e2-839a-4e56-b76f-cd32433a8b56','Vishwajith V','vishwasth567@gmail.com','password','9876543210')");
		jdbc.update(
				"insert into user (id, username, email, password, mobileNumber) values ('dda5654c-5319-4f2f-b2d8-1cb949b84106','Vishwajith','vishwajith@gmail.com','password','9876543210')");
		jdbc.update(
				"insert into user(id, username, email, password, role, shopName, experience) values ('2f36e751-d162-47ee-870b-667a7bd8a8f7','Madhan Raj','madRaj999@gmail.com','password','trainer','Madhan Raj Pet Store',10)");
		jdbc.update(
				"insert into user(id, username, email, password, role, shopName, experience) values ('e3a4e274-d2af-41af-a351-c4ca7e46fc1d','Ajay krishna','ajaya22@gmail.com','password','trainer','Ajay krishna Pet Center',8)");
		jdbc.update(
				"insert into user(id, username, email, password, role, shopName, experience) values ('3448e12d-5a50-4df6-9f4b-e9c876c0d894','Balaji D','balaji345@gmail.com','password','trainer','Balaji Pet Center',2)");
		jdbc.update(
				"insert into user(id, username, email, password, role, shopName, experience) values ('484d7f14-e684-44b6-9c1f-35730b817b11','Sakthi Siva','sivas222@gmail.com','password','trainer','Sakthi Siva Pet care',7)");
		jdbc.update(
				"insert into user(id, username, email, password, role, shopName, experience) values ('bf6ae6a9-0447-40d1-af20-4552ab9f9670','Saravanan S','sarass1234@gmail.com','password','trainer','Saravanan Trainer center',7)");
		jdbc.update(
				"insert into user(id, username, email, password, role, shopName, experience) values ('5d39d1fa-45d9-4ab9-a657-6e1a24cd6546','Ashwin S','aswindineshd112@gmail.com','password','trainer','Ashwin S Pet care',5)");
		jdbc.update(
				"insert into user(id, username, email, password, role, shopName, experience) values ('d031a0e5-dc10-4e1b-8856-f589b0f0d1ad','Lokesh R','lokiloki123@gmail.com','password','trainer','Lokesh R dog care',2)");
		jdbc.update(
				"insert into user(id, username, email, password, role, shopName, experience) values ('210e4967-b2c9-489e-8618-a1b4aa9a2f01','Venkatesh D','venky27@gmail.com','password','trainer','Venky Pet care',7)");
		jdbc.update(
				"insert into user(id, username, email, password, role, shopName, experience) values ('916276aa-cfda-4c63-9d8d-3c0f729fdcd8','Dinesh D','dineshd2@gmail.com','password','trainer','Dinesh Pet Center',8)");

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
		Message msg = new Message();
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

	@PostMapping(value = "/otp")
	public Message sendOtp(@RequestBody User user) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user.getEmail());

		int otp = (int) (Math.random() * (999999 - 100000 + 1) + 100000);
		message.setSubject("Login Two Factor Authentication otp");
		message.setText(String.valueOf(otp));

		javaMailSender.send(message);

		String query = "update user set otp='" + otp + "'  where email='" + user.getEmail() + "';";

		Message msg = new Message();
		if (jdbc.update(query) == 0) {
			msg.setMessage("Not such account exist");
		} else {
			msg.setMessage("Otp successfully sent");
		}
		return msg;
	}

	@PostMapping(value = "/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		User res = jdbc.query(
				"select id, email, username, mobileNumber, active, role, shopName, experience, otp from user where email='"
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
							e.setOtp(rs.getInt(9));
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
		Message msg = new Message();
		if (logUser.getEmail() == null) {
			msg.setMessage("Not such account exist");
		} else if (logUser.getEmail().equals(user.getEmail()) && logUser.getPassword().equals(user.getPassword())
				&& res.getOtp() == user.getOtp()) {
			final String str = jwt.generateToken(logUser);
			Jwt jwt = new Jwt();
			jwt.setJwt(str);
			jwt.setRole(res.getRole());
			return ResponseEntity.ok(jwt);
		} else if (res.getOtp() != user.getOtp()) {
			msg.setMessage("Invalid Otp");

		} else {
			msg.setMessage("Wrong username or password");
		}
		return ResponseEntity.ok(msg);
	}

	@GetMapping("/Admin")
	public ResponseEntity<?> getTrainers(@RequestHeader("Authorization") String authToken) {
		String token = authToken.substring(7, authToken.length());
		User authUser = jwt.validateToken(token, "admin");
		if (authUser.getMessage() != null) {
			Message msg = new Message();
			msg.setMessage(authUser.getMessage());
			return ResponseEntity.ok(msg);
		}
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
							e.setProfileUrl(rs.getString(10));
							list.add(e);
						}
						return list;
					}
				});
		return ResponseEntity.ok(logUser);
	}

	@GetMapping("/Trainer")
	public ResponseEntity<?> getTrainersForTrainer(@RequestHeader("Authorization") String authToken) {
		String token = authToken.substring(7, authToken.length());
		User authUser = jwt.validateToken(token, "owner");
		if (authUser.getMessage() != null) {
			Message msg = new Message();
			msg.setMessage(authUser.getMessage());
			return ResponseEntity.ok(msg);
		}
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
							e.setProfileUrl(rs.getString(10));
							list.add(e);
						}
						return list;
					}
				});
		return ResponseEntity.ok(logUser);
	}

	@PostMapping("/Admin/add")
	public ResponseEntity<?> addTrainer(@RequestHeader("Authorization") String authToken, @RequestBody User user) {
		String token = authToken.substring(7, authToken.length());
		User authUser = jwt.validateToken(token, "admin");
		if (authUser.getMessage() != null) {
			Message msg = new Message();
			msg.setMessage(authUser.getMessage());
			return ResponseEntity.ok(msg);
		}
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
			String query = "insert into user (id, username, email, password, role, shopName, experience, profileUrl) values ('"
					+ UUID.randomUUID() + "','" + user.getUsername() + "','" + user.getEmail() + "','"
					+ user.getPassword() + "','" + user.getRole() + "','" + user.getShopName() + "',"
					+ user.getExperience() + ", '" + user.getProfileUrl() + "');";
			jdbc.update(query);
			msg.setMessage("Trainer Added Successfully");
		}
		return ResponseEntity.ok(msg);
	}

	@DeleteMapping(value = "/Admin/remove/{id}")
	public ResponseEntity<?> removeTrainer(@RequestHeader("Authorization") String authToken,
			@PathVariable("id") String id) {
		String token = authToken.substring(7, authToken.length());
		User authUser = jwt.validateToken(token, "admin");
		if (authUser.getMessage() != null) {
			Message msg = new Message();
			msg.setMessage(authUser.getMessage());
			return ResponseEntity.ok(msg);
		}
		String query = "delete from user where id='" + id + "';";
		jdbc.update(query);
		Message msg = new Message();
		msg.setMessage("Trainer removed Successfully");
		return ResponseEntity.ok(msg);
	}

	@PutMapping(value = "/Admin/update/{id}")

	public ResponseEntity<?> updateTrainer(@RequestHeader("Authorization") String authToken,
			@PathVariable("id") String id, @RequestBody User user) {
		String token = authToken.substring(7, authToken.length());
		User authUser = jwt.validateToken(token, "admin");
		if (authUser.getMessage() != null) {
			Message msg = new Message();
			msg.setMessage(authUser.getMessage());
			return ResponseEntity.ok(msg);
		}
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
				+ "', experience=" + user.getExperience() + ", profileUrl='" + user.getProfileUrl() + "'  where id='"
				+ id + "';";
		jdbc.update(query);
		Message msg = new Message();
		msg.setMessage("Trainer Details Updated Successfully");
		return ResponseEntity.ok(msg);
	}
}