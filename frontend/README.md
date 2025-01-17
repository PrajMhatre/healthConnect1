CREATE DATABASE healthcare_system;
USE healthcare_system;

CREATE TABLE Login_Registration (
    User_Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(50) NOT NULL
);



CREATE TABLE Doctor_Data (
    Dr_Id INT AUTO_INCREMENT PRIMARY KEY,
    Dr_Name VARCHAR(100) NOT NULL,
    Experience INT NOT NULL,
    Location VARCHAR(100) NOT NULL,
    Speciality VARCHAR(100) NOT NULL,
    Contact_Info VARCHAR(100),
    Availability_Status VARCHAR(50),
    Ratings DECIMAL(3, 2),
    Consultation_Fee DECIMAL(10, 2)
);

CREATE TABLE Patient_History (
    User_Id INT,
    Username VARCHAR(100) NOT NULL,
    Previous_Diseases TEXT,
    Previous_Symptoms TEXT,
    Date_Of_Record DATE,
    Doctor_Id INT,
    Dr_Name VARCHAR(100),
    PRIMARY KEY (User_Id, Date_Of_Record),
    FOREIGN KEY (User_Id) REFERENCES Login_Registration(User_Id),
    FOREIGN KEY (Doctor_Id) REFERENCES Doctor_Data(Dr_Id)
);

ALTER TABLE Doctor_Data
MODIFY COLUMN Availability_Status VARCHAR(50) NOT NULL,
MODIFY COLUMN Consultation_Fee DECIMAL(10, 2) NOT NULL;

SHOW TABLES;
DESCRIBE Login_Registration;
DESCRIBE Patient_History;
DESCRIBE Doctor_Data;


