select "POPULATION_TOTAL" from mobility;

select m."POPULATION_TOTAL", hl."POPULATION_TOTAL"
FROM hl_population AS hl
Inner Join mobility AS m ON
m.zipcode=hl.zipcode;