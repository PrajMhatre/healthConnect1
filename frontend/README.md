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
    Ratings DECIMAL(3, 2),
    Consultation_Fee DECIMAL(10, 2),
    Email VARCHAR(100) NOT NULL UNIQUE,
    Availability_Status_9_to_12 VARCHAR(50),
    Availability_Status_2_to_5 VARCHAR(50),
    Availability_Status_6_to_9 VARCHAR(50),
    Google_Map VARCHAR(255),
    Description TEXT,
    Clinic_Name VARCHAR(100)
);



CREATE TABLE Patient_History (
    History_Id INT AUTO_INCREMENT PRIMARY KEY, -- New Primary Key
    User_Id INT,
    Username VARCHAR(100) NOT NULL,
    Previous_Diseases TEXT,
    Previous_Symptoms TEXT,
    Date_Of_Record DATE,
    Doctor_Id INT,
    Dr_Name VARCHAR(100),
    FOREIGN KEY (User_Id) REFERENCES Login_Registration(User_Id),
    FOREIGN KEY (Doctor_Id) REFERENCES Doctor_Data(Dr_Id)
);

ALTER TABLE Doctor_Data
MODIFY COLUMN Availability_Status VARCHAR(50) NOT NULL,
MODIFY COLUMN Consultation_Fee DECIMAL(10, 2) NOT NULL;
ALTER TABLE Doctor_Data ADD COLUMN Email VARCHAR(100) NOT NULL UNIQUE;

SHOW TABLES;
DESCRIBE Login_Registration;
DESCRIBE Patient_History;
DESCRIBE Doctor_Data;


-- Inserting Patients
INSERT INTO Login_Registration (Username, Email, Password, Role) 
VALUES 
('john_doe', 'john.doe@example.com', 'password123', 'patient'),
('jane_smith', 'jane.smith@example.com', 'password456', 'patient'),
('alice_wang', 'alice.wang@example.com', 'password789', 'patient');

-- Inserting Doctors
INSERT INTO Login_Registration (Username, Email, Password, Role) 
VALUES 
('dr_smith', 'dr.smith@example.com', 'doctor123', 'doctor'),
('dr_jones', 'dr.jones@example.com', 'doctor456', 'doctor'),
('dr_lee', 'dr.lee@example.com', 'doctor789', 'doctor');

SELECT * FROM Login_Registration;


-- Inserting Doctors (Email matches Login_Registration)
INSERT INTO Doctor_Data (Dr_Name, Experience, Location, Speciality, Contact_Info, Availability_Status, Ratings, Consultation_Fee, Email) 
VALUES 
('Dr. Smith', 10, 'New York', 'Cardiologist', '123-456-7890', 'Available', 4.5, 200.00, 'dr.smith@example.com'),
('Dr. Jones', 8, 'Los Angeles', 'Dermatologist', '234-567-8901', 'Available', 4.7, 150.00, 'dr.jones@example.com'),
('Dr. Lee', 12, 'Chicago', 'Neurologist', '345-678-9012', 'Not Available', 4.8, 250.00, 'dr.lee@example.com');

SELECT * FROM Doctor_Data;



-- Inserting Patient History
INSERT INTO Patient_History (User_Id, Username, Previous_Diseases, Previous_Symptoms, Date_Of_Record, Doctor_Id, Dr_Name) 
VALUES 
(1, 'john_doe', 'Hypertension', 'High blood pressure, headaches', '2023-10-01', 1, 'Dr. Smith'),
(2, 'jane_smith', 'Acne', 'Skin rashes, redness', '2023-09-15', 2, 'Dr. Jones'),
(3, 'alice_wang', 'Migraine', 'Severe headaches, nausea', '2023-08-20', 3, 'Dr. Lee');

SELECT * FROM Patient_History;