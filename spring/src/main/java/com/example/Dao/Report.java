package com.example.Dao;

public class Report {
    private String id;
    private String appointmentId;
    private String report;
    private String date;
    private int days;
    private int amount;
    private String issuedBy;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(String appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getIssuedBy() {
        return issuedBy;
    }

    public void setIssuedBy(String issuedBy) {
        this.issuedBy = issuedBy;
    }

    public Report() {
    }

	public Report(String id, String appointmentId, String report, String date, int days, int amount, String issuedBy) {
		this.id = id;
		this.appointmentId = appointmentId;
		this.report = report;
		this.date = date;
		this.days = days;
		this.amount = amount;
		this.issuedBy = issuedBy;
	}


}