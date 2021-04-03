package com.example.Dao;

public class Jwt {
    private String jwt;
    private String role;
    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Jwt() {
    }

	public Jwt(String jwt, String role) {
		this.jwt = jwt;
		this.role = role;
	}
    
}