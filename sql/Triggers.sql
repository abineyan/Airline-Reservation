USE airline_reservation_project;

-- Update NumberOfTimesBooked --
DROP TRIGGER IF EXISTS tickets_after_insert;
DELIMITER $$
CREATE TRIGGER tickets_after_insert
	AFTER INSERT ON tickets
    FOR EACH ROW
BEGIN
	UPDATE registered_passengers
    SET NumberOfTimesBooked = NumberOfTimesBooked+1
    WHERE PassengerId = NEW.PassengerId;
END $$
DELIMITER ;

-- Update the ReawdClass --
DROP TRIGGER IF EXISTS registered_passengers_after_insert;
DELIMITER $$
CREATE TRIGGER registered_passengers_after_insert
	AFTER INSERT ON passengers
    FOR EACH ROW
BEGIN
    IF NumberOfTimesBooked > 15 THEN
		UPDATE registered_passengers SET RewardClassId=3 WHERE UserName = NEW.UserName;
	END IF;
	IF NumberOfTimesBooked > 10 THEN
		UPDATE registered_passengers SET RewardClassId=2 WHERE UserName = NEW.UserName;
	END IF;
	IF NumberOfTimesBooked > 5 THEN
		UPDATE registered_passengers SET RewardClassId=1 WHERE UserName = NEW.UserName;
	END IF;
END $$
DELIMITER ;
