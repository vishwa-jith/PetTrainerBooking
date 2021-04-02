package com.example.Dao;

public class Message {
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

   
    @Override
    public String toString() {
        return "Message [message=" + message + "]";
    }

    public Message() {
    }

    public Message(String message) {
        this.message = message;
    }
    
}