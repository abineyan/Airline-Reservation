USE airline_reservation_project;
DROP PROCEDURE IF EXISTS registered_passenger_data_entry;
DROP PROCEDURE IF EXISTS guest_passenger_data_entry;
DROP PROCEDURE IF EXISTS flights_schedule_data_entry;
DROP PROCEDURE IF EXISTS airports_data_entry;
DROP PROCEDURE IF EXISTS aircrafts_data_entry;
DROP PROCEDURE IF EXISTS routes_data_entry;
DROP PROCEDURE IF EXISTS tickets_data_entry;
DROP PROCEDURE IF EXISTS aircraft_models_data_entry;
DROP PROCEDURE IF EXISTS management_crew_data_entry;
DROP PROCEDURE IF EXISTS flight_select_search_results;

-- Data entry for registered user
DELIMITER $$
CREATE PROCEDURE registered_passenger_data_entry (
  UserName VARCHAR(20) ,
  PassportId VARCHAR(20),
  NIC VARCHAR(20),
  FirstName VARCHAR(100),
  LastName VARCHAR(100),
  Email VARCHAR(250),
  PhoneNumber VARCHAR(20),
  DoB DATE,
  Password VARCHAR(1000),
  Address VARCHAR(250),
  Country VARCHAR(100),
  City VARCHAR(100),
  Gender VARCHAR(6)
)
BEGIN
  INSERT INTO passengers
  VALUES (DEFAULT,1);
  
  INSERT INTO registered_passengers
  VALUES (UserName,last_insert_id(),DEFAULT,PassportId,NIC,FirstName,
  LastName,Email,PhoneNumber,DoB,Password,Address,Country,City,Gender,DEFAULT);
END$$
DELIMITER ;

-- Data entry for guest user
DELIMITER $$
CREATE PROCEDURE guest_passenger_data_entry (
  PassportId VARCHAR(20),
  NIC VARCHAR(20),
  FirstName VARCHAR(100),
  LastName VARCHAR(100),
  Email VARCHAR(250),
  PhoneNumber VARCHAR(20),
  DoB DATE
)
BEGIN
  INSERT INTO passengers
  VALUES (DEFAULT,2);
  
  INSERT INTO guest_passengers
  VALUES (last_insert_id(),PassportId,NIC,FirstName,LastName,Email,PhoneNumber,DoB);
END$$
DELIMITER ;

-- Data entry for flights_schedule
DELIMITER $$
CREATE PROCEDURE flights_schedule_data_entry(
  AircraftId VARCHAR(20),
  RouteId INT,
  DepartureDate DATE,
  DepartureTime TIME,
  ArrivalDate DATE,
  ArrivalTime TIME,
  Status VARCHAR(20),
  EconomyPrice DECIMAL(9,2),
  BussinessPrice DECIMAL(9,2),
  PlatinumPrice DECIMAL(9,2)
)
BEGIN
  INSERT INTO flights_schedule
  VALUES(DEFAULT,AircraftId,RouteId,DepartureDate,DepartureTime,ArrivalDate,ArrivalTime,Status);
  
  INSERT INTO price_table
  VALUES(last_insert_id(),1,EconomyPrice);
  
  INSERT INTO price_table
  VALUES(last_insert_id(),2,BussinessPrice);
  
  INSERT INTO price_table
  VALUES(last_insert_id(),3,PlatinumPrice);
END$$
DELIMITER ;

-- Data entry for airports
DELIMITER $$
CREATE PROCEDURE airports_data_entry(
  IATACode VARCHAR(20),
  Name VARCHAR(100),
  Country VARCHAR(100),
  State VARCHAR(100),
  city VARCHAR(100)
)
BEGIN
  INSERT INTO airports
  VALUES(IATACode,Name,Country,State,city);
END$$
DELIMITER ;

-- Data entry for aircrafts
DELIMITER $$
CREATE PROCEDURE aircrafts_data_entry(
  AircraftId VARCHAR(20),
  AircraftModelId INT
)
BEGIN
  INSERT INTO aircrafts
  VALUES(AircraftId,AircraftModelId);
END$$
DELIMITER ;

-- Data entry for routes
DELIMITER $$
CREATE PROCEDURE routes_data_entry(
  DepartureAirportIATACode VARCHAR(20),
  ArrivalAirportIATACode VARCHAR(20),
  DistanceInMiles INT
)
BEGIN
  INSERT INTO routes
  VALUES(DEFAULT,DepartureAirportIATACode,ArrivalAirportIATACode,DistanceInMiles);
END$$
DELIMITER ;

-- Data entry for tickets
DELIMITER $$
CREATE PROCEDURE tickets_data_entry(
  Insert_FlightId INT,
  Insert_Class_Type INT,
  Insert_RowNo INT,
  Insert_ColumnNo INT,
  Insert_PassengerId INT
)
BEGIN
  DECLARE FoundSeatId VARCHAR(20);
  SELECT SeatId INTO FoundSeatId 
  FROM Seats WHERE
	AircraftModelId=(
			SELECT DISTINCT aircraft_models.AircraftModelId
			FROM tickets JOIN flights_schedule USING (FlightId) 
			JOIN aircrafts USING (AircraftId) 
			JOIN aircraft_models USING(AircraftModelId)
			WHERE flights_schedule.FlightId=Insert_FlightId) 
	AND ClassTypeId=Insert_Class_Type AND RowNo=Insert_RowNo AND ColumnNo=Insert_ColumnNo;
  IF NOT EXISTS (
      SELECT * FROM tickets 
      WHERE FlightId = Insert_FlightId AND SeatId = FoundSeatId AND PassengerId = Insert_PassengerId
  ) THEN
      INSERT INTO tickets
      VALUES(DEFAULT,Insert_FlightId,FoundSeatId,Insert_PassengerId);
  ELSE
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Duplicate entry detected for FlightId, SeatId, and PassengerId';
  END IF;
END$$
DELIMITER ;

-- Data entry for aircraft models
DELIMITER $$
CREATE PROCEDURE aircraft_models_data_entry(
  AircraftModel VARCHAR(20),
  EconomyClassSeatCount INT,
  BusinessClassSeatCount INT,
  PlatinumClassSeatCount INT
)
BEGIN
  INSERT INTO aircraft_models
  VALUES(DEFAULT,AircraftModel,EconomyClassSeatCount,BusinessClassSeatCount,PlatinumClassSeatCount);
END$$
DELIMITER ;

-- Data entry for management crew
DELIMITER $$
CREATE PROCEDURE management_crew_data_entry(
  ManagerId VARCHAR(20),
  Password VARCHAR(20),
  Name VARCHAR(50),
  Role VARCHAR(50)
)
BEGIN
  INSERT INTO management_crew
  VALUES(ManagerId,Password,Name,Role);
END$$
DELIMITER ;

-- Data entry for search
DELIMITER $$
CREATE PROCEDURE flight_select_search_results(
  InsertedDepartureAirportIATACode VARCHAR(20),
  InsertedArrivalAirportIATACode VARCHAR(20),
  FromDate DATE,
  ToDate DATE
)
BEGIN
  DECLARE IRouteId INT;
  
  SELECT routes.RouteId INTO IRouteId
  FROM routes
  WHERE routes.DepartureAirportIATACode = InsertedDepartureAirportIATACode
    AND routes.ArrivalAirportIATACode = InsertedArrivalAirportIATACode;

  SELECT FlightId, DepartureDate, DepartureTime, ArrivalDate, ArrivalTime
  FROM flights_schedule
  WHERE RouteId = IRouteId
    AND DepartureDate BETWEEN FromDate AND ToDate;
END$$

DELIMITER ;
