select * from education_status;

ALTER TABLE education_status
ADD COLUMN O25_10th_Grade_Attained_Ratio numeric;

ALTER TABLE education_status
ADD COLUMN O25_11th_Grade_Attained_Ratio numeric;

ALTER TABLE education_status
ADD COLUMN O25_12th_Grade_Started_Ratio numeric;

ALTER TABLE education_status
ADD COLUMN O25_High_School_Completed_Ratio numeric;

ALTER TABLE education_status
ADD COLUMN O25_GED_Attained_Ratio numeric;

ALTER TABLE education_status
ADD COLUMN O25_Less_One_Yr_College_Ratio numeric;

ALTER TABLE education_status
ADD COLUMN O25_More_One_Yr_College_Ratio numeric;

ALTER TABLE education_status
ADD COLUMN O25_Assoc_Degree_Completed_Ratio numeric;

ALTER TABLE education_status
ADD COLUMN O25_Bach_Degree_Completed_Ratio numeric;

ALTER TABLE education_status
ADD COLUMN O25_Masters_Degree_Completed_Ratio numeric;

ALTER TABLE education_status
ADD COLUMN O25_Professional_Degree_Completed_Ratio numeric;

ALTER TABLE education_status
ADD COLUMN O25_Doctoral_Degree_Completed_Ratio numeric;

	
DELETE FROM education_status WHERE "O25 POPULATION TOTAL" = 0;

UPDATE education_status set O25_10th_Grade_Attained_Ratio = ("O25 POPULATION 10TH G" * 1.0 / "O25 POPULATION TOTAL");
UPDATE education_status set O25_11th_Grade_Attained_Ratio = ("O25 POPULATION 11TH G" * 1.0 / "O25 POPULATION TOTAL");
UPDATE education_status set O25_12th_Grade_Started_Ratio = ("O25 POPULATION 12TH G" * 1.0 / "O25 POPULATION TOTAL");
UPDATE education_status set O25_High_School_Completed_Ratio = ("O25 POPULATION HS DIPLOMA" * 1.0 / "O25 POPULATION TOTAL");
UPDATE education_status set O25_GED_Attained_Ratio = ("O25 POPULATION GED" * 1.0 / "O25 POPULATION TOTAL");
UPDATE education_status set O25_Less_One_Yr_College_Ratio = ("O25 POPULATION LESS ONE YR COLLEGE" * 1.0 / "O25 POPULATION TOTAL");
UPDATE education_status set O25_More_One_Yr_College_Ratio = ("O25 POPULATION MORE ONE YR COLLEGE" * 1.0 / "O25 POPULATION TOTAL");
UPDATE education_status set O25_Assoc_Degree_Completed_Ratio = ("O25 POPULATION ASSC DEGREE" * 1.0 / "O25 POPULATION TOTAL");
UPDATE education_status set O25_Bach_Degree_Completed_Ratio = ("O25 POPULATION BACHELOR DEGREE" * 1.0 / "O25 POPULATION TOTAL");
UPDATE education_status set O25_Masters_Degree_Completed_Ratio = ("O25 POPULATION MASTER DEGREE" * 1.0 / "O25 POPULATION TOTAL");
UPDATE education_status set O25_Professional_Degree_Completed_Ratio = ("025 POPULATION PROFESSIONAL DEGREE" * 1.0 / "O25 POPULATION TOTAL");
UPDATE education_status set O25_Doctoral_Degree_Completed_Ratio = ("O25 POPULATION DOCTORATE DEGREE" * 1.0 / "O25 POPULATION TOTAL");

SELECT * FROM education_status