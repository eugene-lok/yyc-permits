# YYC Permits
### ENGO 551 Winter 2021 Lab 2 Submission 
YYC Permits is an interactive geoweb application mapping building permits in Calgary. It utilizes the City of Calgary's Open Calgary API to display GeoJSON data on the web map.

## Tech Stack
Leaflet, JavaScript, HTML + CSS

## Notable Features
* Search by Date - By querying a start and end date, users can find building permits issued during the selected date range
* Permit Description - Clicking on a permit marker will display the following information:
  * Issued Date
  * Work Class
  * Name of Contractor
  * Community
  * Address
* Marker Clustering - Animated marker clustering at appropriate zoom levels
* Marker Spiderfier - Separates close markers at maximum zoom level

## File Structure
* /css/app.css - Styling for the app 
* /js/app.js - API requests, seach form logic, Leaflet map parameters 
* .gitignore - Specifies files ignored by Git
* index.html - Displays map and search form
* package-lock.json - Tracks version of installed packages via `npm` 
