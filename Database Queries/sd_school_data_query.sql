select * from sd_school_data;

ALTER TABLE sd_school_data ALTER COLUMN "School Rating" TYPE int using("School Rating"::int);

ALTER TABLE sd_school_data ALTER COLUMN "Total Students Enrolled" TYPE int using("Total Students Enrolled"::int);

ALTER TABLE sd_school_data
ADD COLUMN total_school_rating_points bigint;

UPDATE sd_school_data set total_school_rating_points = ("School Rating" * "Total Students Enrolled");

SELECT "Zip Code", SUM("total_school_rating_points")/SUM("Total Students Enrolled") AS "Average Great School Rating Per Student in Zipcode"
FROM sd_school_data
GROUP BY "Zip Code";