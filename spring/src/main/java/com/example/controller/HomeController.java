package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
	
	@Autowired
	JdbcTemplate jdbc;

	@GetMapping("/")
	public String testApi() {
		String sql="select * from user;";
		
		jdbc.qu
		
		return "Api is working!";
	}
}
