### Visualizing the economic burden of mental disease treatment in NYC

#### Data: SPARCS inpatient discharge data 2014
1. The data is preprocessed in R. All the exploration and description are in detail here:
    https://github.com/super-penguin/NYC_mental_health_profile
2. The summary data for this d3 map visualization is collected with R code here (https://github.com/super-penguin/NYC_mental_health_profile/blob/gh-pages/Summary_data_d3.R) and saved in file "NYC_mental_2014.csv".

| Data          |  Description (DATA in 2014)                                                            |
| ------------- | -------------------------------------------------------------------------------------- |
| BoroName      |  The five boroughs in NYC (Bronx, Brooklyn, Manhattan, Queens, Staten Island)          |
| mean_charges  |  The average charge of mental disease treatment for each patients in each borough      |
| sum_costs     |  The accumulated cost of mental disease treatment for all the patients in each borough |
| Population    |  The total population of each borough in NYC                                           |
| Patents_10K   |  The annual patients number per 10k population with mental disease in each borough     |

3. The original shapefile of NYC map is downloaded from:
 http://www1.nyc.gov/site/planning/data-maps/open-data/districts-download-metadata.page
Next, the shapefile is processed and saved as jeojson file in "boroughs.geojson".

#### Summary
1. The purpose of this d3 project is to visualize the economic burden of mental disease treatment at county level in NYC.

2. In the five counties of NYC, Manhattan does not have the largest population, however it has the largest patients number and highest economic burden with mental disease treatment compared with other counties. In addition, the average charge for each patients with mental disease is the highest in Queens.  

3. This visualization indicates two things:
    - First, the condensed population and high living pressure in Manhattan might be the leading cause for the high economic burden, thus, more fundings and services should be distributed in Manhattan to improve the mental health of New Yorkers.
    - Second, the average charge for mental disease treatment is high in Queens. It might be caused by the health insurance system. Further exploration with more data should be performed to get a better insight.

#### Design
1. The values of mental disease patients number, average charge and accumulated cost at each borough are displayed as the filling color on the maps.

2. The 3 maps are aligned side by side to have a better comparison.

3. When mouse is hovering over each borough on the map, the values will show up.

#### Feedback
1. I only had one map in version1, and got suggestion that the idea was not clearly conveyed. Multiple maps showing more information would be better.   Please see "index1.html"

2. Multiple maps showing patients number, average charge and accumulated cost at county level were added. However, I got feedbacks that there were no clear titles and legends to explain the data. Please see "index2.html"

3. Titles are added and when mouse is hovering over, the values will show up in text on each map.
Please see "index_final.html"

#### Resources
- http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922
- https://bl.ocks.org/mbostock
- https://blog.webkid.io/multiple-maps-d3/
- http://learnjsdata.com/read_data.html
