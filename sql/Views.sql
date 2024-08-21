USE airline_reservation_project;

-- View Passenger Details
CREATE VIEW passenger_details AS
SELECT
	fs.FlightId,
    fs.Status,
    gp.PassportId,
	gp.FirstName, 
    gp.LastName,
    TIMESTAMPDIFF(YEAR, gp.DoB, CURRENT_DATE) AS Age,
	fs.DepartureDate,
	fs.DepartureTime,
    a.Name AS departure,
    b.Name AS arrival
FROM flights_schedule fs
JOIN tickets t ON fs.FlightId = t.FlightId
JOIN passengers p ON t.PassengerId = p.PassengerId
JOIN guest_passengers gp ON gp.PassengerId = p.PassengerId
JOIN routes r ON r.RouteId = fs.RouteId
JOIN airports a ON r.DepartureAirportIATACode = a.IATACode
JOIN airports b ON r.ArrivalAirportIATACode = b.IATACode
UNION
SELECT
	fs.FlightId,
    fs.Status,
	rp.PassportId,
	rp.FirstName, 
    rp.LastName,
    TIMESTAMPDIFF(YEAR, rp.DoB, CURRENT_DATE) AS Age,
	fs.DepartureDate,
	fs.DepartureTime,
	a.Name AS departure,
	b.Name AS arrival
FROM flights_schedule fs
JOIN tickets t ON fs.FlightId = t.FlightId
JOIN passengers p ON t.PassengerId = p.PassengerId
JOIN registered_passengers rp ON rp.PassengerId = p.PassengerId
JOIN routes r ON r.RouteId = fs.RouteId
JOIN airports a ON r.DepartureAirportIATACode = a.IATACode
JOIN airports b ON r.ArrivalAirportIATACode = b.IATACode;

-- View Passenger Count
CREATE VIEW passenger_counts AS
SELECT 
    t.TicketNumber,
    fs.DepartureDate,
    fs.DepartureTime,
    tc.ClassType,
    am.AircraftModel,
    pt.Price
FROM flights_schedule fs 
JOIN tickets t ON fs.FlightId = t.FlightId
JOIN seats s ON s.SeatId = t.SeatId
JOIN traveler_classes tc ON tc.ClassTypeId = s.ClassTypeId
JOIN price_table pt ON pt.FlightId = fs.FlightId AND pt.ClassTypeId = tc.ClassTypeId
JOIN aircrafts a ON a.AircraftId = fs.AircraftId
JOIN aircraft_models am ON a.AircraftModelId = am.AircraftModelId;
