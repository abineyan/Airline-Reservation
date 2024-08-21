USE airline_reservation_project;

-- Check seat avilability
DROP FUNCTION IF EXISTS seat_available_check;
DELIMITER $$
CREATE FUNCTION seat_available_check()
    RETURNS BOOL DETERMINISTIC
BEGIN
    DECLARE seat_availability varchar(20);
    SELECT TicketNumber INTO seat_availability FROM tickets where SeatId=(
		SELECT SeatId FROM Seats WHERE
		AircraftModelId=(
				SELECT DISTINCT aircraft_models.AircraftModelId
				FROM tickets JOIN flights_schedule USING (FlightId) 
				JOIN aircrafts USING (AircraftId) 
				JOIN aircraft_models USING(AircraftModelId)
				WHERE flights_schedule.FlightId=1) 
		AND ClassTypeId=1 AND RowNo=1 AND ColumnNo=2)
    AND FlightId=1;
    
    IF seat_availability IS NULL THEN
		RETURN FALSE;
    ELSE
		RETURN TRUE;
	END IF;
END$$
DELIMITER $$

SELECT gp.FirstName, gp.LastName,
	TIMESTAMPDIFF(YEAR, gp.DoB, CURRENT_DATE) AS age
FROM flights_schedule fs
JOIN tickets t ON fs.FlightId = t.FlightId
JOIN passengers p ON t.PassengerId = p.PassengerId
JOIN guest_passengers gp ON gp.PassengerId = p.PassengerId
-- JOIN routes r ON r.RouteId = fs.RouteId
-- JOIN airports a ON r.DepartureAirportIATACode
-- JOIN airports b ON r.ArrivalAirportIATACode

UNION

SELECT rp.FirstName, rp.LastName,
	TIMESTAMPDIFF(YEAR, rp.DoB, CURRENT_DATE) AS age
FROM flights_schedule fs
JOIN tickets t ON fs.FlightId = t.FlightId
JOIN passengers p ON t.PassengerId = p.PassengerId
JOIN registered_passengers rp ON rp.PassengerId = p.PassengerId;
-- JOIN routes r ON r.RouteId = fs.RouteId 
-- JOIN airports a ON r.DepartureAirportIATACode
-- JOIN airports b ON r.ArrivalAirportIATACode