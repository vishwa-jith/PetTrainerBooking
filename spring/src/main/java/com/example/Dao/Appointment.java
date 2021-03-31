package com.example.Dao;

public class Appointment {
    private String id;
    private String userId;
    private String date;
    private String issuedBy;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getIssuedBy() {
        return issuedBy;
    }

    public void setIssuedBy(String issuedBy) {
        this.issuedBy = issuedBy;
    }

    public Appointment(String id, String userId, String date, String issuedBy) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.issuedBy = issuedBy;
    }

    @Override
    public String toString() {
        return "Appointment [date=" + date + ", id=" + id + ", issuedBy=" + issuedBy + ", userId=" + userId + "]";
    }

    public Appointment() {
    }
    
}