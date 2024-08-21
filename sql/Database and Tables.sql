-- Schema AirLine_Reservation_Project

DROP SCHEMA IF EXISTS airline_reservation_project;
CREATE SCHEMA IF NOT EXISTS airline_reservation_project;

USE airline_reservation_project ;

-- Table ManagementCrew
CREATE TABLE IF NOT EXISTS management_crew(
  ManagerId VARCHAR(20) NOT NULL,
  Password VARCHAR(20) NOT NULL,
  Name VARCHAR(50) NOT NULL,
  Role VARCHAR(50) NOT NULL,
  PRIMARY KEY (ManagerId)
);

-- Table passengerTypes
CREATE TABLE IF NOT EXISTS passenger_types(
  PassengerTypeId TINYINT NOT NULL,			
  PassengerType VARCHAR(20) NOT NULL,
  PRIMARY KEY (PassengerTypeId)
);

-- Table passengers
CREATE TABLE IF NOT EXISTS passengers(
  PassengerId INT NOT NULL AUTO_INCREMENT,
  PassengerTypeId TINYINT NOT NULL,
  PRIMARY KEY (PassengerId),
  FOREIGN KEY (PassengerTypeId) REFERENCES passenger_types(PassengerTypeId) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table reward_class
CREATE TABLE IF NOT EXISTS reward_class(
  RewardClassId TINYINT NOT NULL,
  RewardClass VARCHAR(20) NOT NULL,
  Discount FLOAT NOT NULL,
  PRIMARY KEY (RewardClassId)
);

-- Table RegisteredPassengers
CREATE TABLE IF NOT EXISTS registered_passengers (
  UserName VARCHAR(20) NOT NULL,
  PassengerId INT NOT NULL,
  RewardClassId TINYINT DEFAULT NULL ,
  PassportId VARCHAR(20) NOT NULL,
  NIC VARCHAR(20) NOT NULL,
  FirstName VARCHAR(100) NOT NULL,
  LastName VARCHAR(100) NOT NULL,
  Email VARCHAR(250) NOT NULL,
  PhoneNumber VARCHAR(20) NOT NULL,
  DoB DATE NOT NULL,
  Password VARCHAR(10000) NOT NULL,
  Address VARCHAR(250) NOT NULL,
  Country VARCHAR(100) NOT NULL,
  City VARCHAR(100) NOT NULL,
  Gender VARCHAR(6) NOT NULL,
  NumberOfTimesBooked INT DEFAULT 0,
  PRIMARY KEY (UserName),
  FOREIGN KEY (PassengerId) REFERENCES passengers(PassengerId) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (RewardClassId) REFERENCES reward_class(RewardClassId) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table GuestPassengers
CREATE TABLE IF NOT EXISTS guest_passengers (
  PassengerId INT NOT NULL,
  PassportId VARCHAR(20) NOT NULL,
  NIC VARCHAR(20) NOT NULL,
  FirstName VARCHAR(100) NOT NULL,
  LastName VARCHAR(100) NOT NULL,
  Email VARCHAR(250) NOT NULL,
  PhoneNumber VARCHAR(20) NOT NULL,
  DoB DATE NOT NULL,
  PRIMARY KEY (PassengerId),
  FOREIGN KEY (PassengerId) REFERENCES passengers(PassengerId) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table airports
CREATE TABLE IF NOT EXISTS airports (
  IATACode VARCHAR(20) NOT NULL,
  Name VARCHAR(100) NOT NULL,
  Country VARCHAR(100) NOT NULL,
  State VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  PRIMARY KEY (IATACode)
);

-- Table aircraft_models
CREATE TABLE IF NOT EXISTS aircraft_models(
  AircraftModelId INT NOT NULL AUTO_INCREMENT,
  AircraftModel VARCHAR(20) NOT NULL,
  EconomyClassSeatCount INT NOT NULL,
  BussinessClassSeatCount INT NOT NULL,
  PlatinumClassSeatCount INT NOT NULL,
  PRIMARY KEY (AircraftModelId)
);

-- Table aircrafts
CREATE TABLE IF NOT EXISTS aircrafts (
  AircraftId VARCHAR(20) NOT NULL,
  AircraftModelId INT NOT NULL,
  PRIMARY KEY (AircraftId),
  FOREIGN KEY (AircraftModelId) REFERENCES aircraft_models(AircraftModelId) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table Route
CREATE TABLE IF NOT EXISTS routes(
  RouteId INT NOT NULL AUTO_INCREMENT,
  DepartureAirportIATACode VARCHAR(20) NOT NULL,
  ArrivalAirportIATACode VARCHAR(20) NOT NULL,
  DistanceInMiles INT,
  PRIMARY KEY (RouteId),
  FOREIGN KEY (DepartureAirportIATACode) REFERENCES airports(IATACode) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (ArrivalAirportIATACode) REFERENCES airports(IATACode) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table flight_schedule
CREATE TABLE IF NOT EXISTS flights_schedule (
  FlightId INT NOT NULL AUTO_INCREMENT,
  AircraftId VARCHAR(20) NOT NULL,
  RouteId INT NOT NULL,
  DepartureDate DATE NOT NULL,
  DepartureTime TIME NOT NULL,
  ArrivalDate DATE NOT NULL,
  ArrivalTime TIME NOT NULL,
  Status VARCHAR(20) NOT NULL,
  PRIMARY KEY (FlightId),
  FOREIGN KEY (RouteId) REFERENCES routes(RouteId) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (AircraftId) REFERENCES  aircrafts(AircraftId) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table traveler_classes
CREATE TABLE IF NOT EXISTS traveler_classes(
  ClassTypeId TINYINT NOT NULL,
  ClassType VARCHAR(20) NOT NULL,
  PRIMARY KEY (ClassTypeId)
);

-- Table price_table
CREATE TABLE IF NOT EXISTS price_table(
  FlightId INT NOT NULL,
  ClassTypeId TINYINT NOT NULL,
  Price DECIMAL(9,2),
  PRIMARY KEY(ClassTypeId, FlightId),
  FOREIGN KEY (ClassTypeId) REFERENCES traveler_classes(ClassTypeId) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (FlightId) REFERENCES flights_schedule(FlightId) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table seat
CREATE TABLE IF NOT EXISTS seats (
  SeatId VARCHAR(20) NOT NULL,
  AircraftModelId INT NOT NULL,
  ClassTypeId TINYINT NOT NULL,
  RowNo INT NOT NULL,
  ColumnNo INT NOT NULL,
  PRIMARY KEY (SeatId),
  FOREIGN KEY (AircraftModelId) REFERENCES aircraft_models(AircraftModelId) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (ClassTypeId) REFERENCES traveler_classes(ClassTypeId) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table tickets
CREATE TABLE IF NOT EXISTS tickets (
  TicketNumber INT NOT NULL AUTO_INCREMENT,
  FlightId INT NOT NULL,
  SeatId VARCHAR(20) NOT NULL,
  PassengerId INT NOT NULL,
  PRIMARY KEY (TicketNumber),
  FOREIGN KEY (FlightId) REFERENCES flights_schedule(FlightId) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (SeatId) REFERENCES seats(SeatId) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (PassengerId) REFERENCES passengers(PassengerId) ON DELETE CASCADE ON UPDATE CASCADE
);

DELIMITER //

