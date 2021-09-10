delete from crime_sample

insert into crime_sample (crime, agency, charge_description, date, address, zipcode, city, type, latitude, longitude)
select a.crime, a.agency, a.charge_description, a.date, a.address, a.zipcode, a.city, a.type, b.latitude, b.longitude
from crime_data a, geometrical_data b
where a.zipcode = b.zipcode

select * from crime_sample
